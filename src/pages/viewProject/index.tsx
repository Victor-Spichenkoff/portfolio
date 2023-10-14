import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link  from 'next/link'
import axios from 'axios'
import { baseUrl } from '@/global'
import Header from '@/components/templates/Header'
import { stringToHtml } from '@/hooks/useProject'
import Error from '@/components/templates/Error'
import { VerifyAcess } from '@/hooks/useUser';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faHeart } from "@fortawesome/free-solid-svg-icons";



export default function ViewProfile() {
    // VerifyAcess()


    const router = useRouter()
    const id = router.query.id
    
    const [project, setProject] = useState<any>({link:'/notFound', dscription: '<p>N</p>', user:{}})
    const [likes, setLikes] = useState(0)
    const [showError, setShowError] = useState<any>('nada')

    function getProject() {
        axios.get(`${baseUrl}/project/view/${id}`)
            .then(res => {
                setProject(res.data)
                setLikes(res.data.likes)
                
            })
            .catch((e) => /*router.push('/home')*/e)
    }

    useEffect(()=> {
        getProject()
    })


    const description = stringToHtml(String(project.description))

    const likesConst = likes ?? project.likes

    const heartColor = showError == 'liked' || showError===true ? 'red' : 'white'

    const animateLike = () => {
        const like = document.getElementById('like-icon')

        if(!like) return 
        like.style.animation = ''
        setTimeout(()=>like.style.animation = 'spin-like 1.1s 0s infinite', 5)
        setTimeout(() => like.style.animation='', 3500)
    }

    async function increaseLike() {
        if(showError == 'liked' || showError===true) return setShowError(true)

        animateLike()
        await axios.post(`${baseUrl}/like`, {id:project.id, currentLikes: likes})
            .then(res => {
                setLikes(res.data.likes)
            })
            .catch((e)=> {})

        setShowError('liked')
    }


    function copy() {
        let textoCopiado = document.getElementById('contact')
        let TextoToCopy =  textoCopiado?.innerText

        navigator.clipboard.writeText(TextoToCopy??'')
            .then(()=>alert('Contact copied'))
    }


    if(project.link == '/notFound') {
        return (
            <div id="project-loading">
            <div className="loading-side" id='loading-full'></div>
        </div>
        )
    } else {
    return (<>
        <Header title={project.name}></Header>
        { showError===true ? <Error type='error' mensage='Already liked'></Error> : '' }
        <main id='view-project-page'>
            <div className="project-link hoverScale">
                <a href={project.link} target='_blanc'>Visit the project</a>
            </div>

            <hr />

            <article className='description'>
                {description}
            </article>

            <div className='like'>
                Help the creator, give a Like!!! {String(likesConst)}
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ fontSize: 17, marginLeft:5, color: heartColor}}
                    onClick={()=>increaseLike()}
                    id='like-icon'
                />
            </div>

            <div className="contact-like-name">
                <div className="view-contact">
                    Contact:     
                    <p id='contact' >{project.user.contact}</p>
                    <FontAwesomeIcon
                        icon={faCopy}
                        style={{color: 'white', margin: '0px 0px 0px 5px', fontSize: '16px'}}
                        onClick={copy}
                        id="copy"
                    />
                </div>

            
                <abbr title="View Profile">
                    <Link href={`/viewProfile?id=${project.user.id}`}>
                        <div className='hoverScale'>{project.user.name}</div>
                    </Link>
                </abbr>
            </div>
        </main>
    </>)
    }
}