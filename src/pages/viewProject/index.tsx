import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link  from 'next/link'
import axios from 'axios'
import { baseUrl } from '@/global'
import Header from '@/components/templates/Header'
import { stringToHtml } from '@/hooks/useProject'
import Error from '@/components/templates/Error'
import { verifyAcess } from '@/hooks/useUser';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";




export default function viewProfile() {
    verifyAcess()

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


    function animateLike() {
        const like = document.getElementById('like-icon')

        if(!like) return 
        like.style.animation = ''
        setTimeout(()=>like.style.animation = 'spin-like 0.7s 0s infinite', 5)
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
                    <img src="https://usagif.com/wp-content/uploads/loading-29.gif" alt=""/>
                </div>
        )
    } else {
    return (<>
        <Header title={project.name}></Header>
        { showError===true ? <Error type='error' mensage='Already liked'></Error> : '' }
        <main id='view-project-page'>
            <div className="project-link">
                <a href={project.link} target='_blanc'>Visit the project here</a>
            </div>
            <article className='description'>
                {description}
            </article>

            <div className='like'>
                Help the creator, give a Like!!!: {String(likesConst)} 
                <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ fontSize: 20, color: "white", marginLeft:5 }} 
                    onClick={()=>increaseLike()}
                    id='like-icon'
                /> 
            </div>

            <div className="contact-like-name">
                <div className="view-contact">
                    Contact:     
                    <p id='contact' >{project.user.contact}</p>
                    <img src="https://img.icons8.com/?size=512&id=43524&format=png" alt="" className="view-copy"
                        onClick={()=>copy()}
                    />
                </div>
            
                <abbr title="View Profile">
                    <Link href={`/viewProfile?id=${project.user.id}`}>
                        {project.user.name}
                    </Link>
                </abbr>
            </div>
        </main>
    </>)
    }
}