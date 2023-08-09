import { useRouter } from "next/router"
import ProfileProject from "@/components/functions/ProfileProject"
import { baseUrl, project_key } from "@/global"
import axios from "axios"
import { useState } from "react"
import { clearStoragedUser, getStoragedUser, VerifyAcess } from "@/hooks/useUser"
import Header from "@/components/templates/Header"
import Footer from "@/components/templates/Footer"
import { setStoragedProject, stringToHtml } from "@/hooks/useProject"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faCopy } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function ViewProfile() {
    VerifyAcess()


    const router = useRouter()
    
    const [showLoading, setShowLoading] = useState(true)
    const [userAndProjects, setUserAndProjects] = useState<any>({projets:[]})

    axios.get(`${baseUrl}/profile/${router.query.id}`)
        .then(res => setUserAndProjects(res.data))
        .catch(console.log)


    const bio = stringToHtml(String(userAndProjects.bio))


    function renderProjects() {
        return userAndProjects.projets.map((project:any ) => {
            return <ProfileProject project={project} redirectFunction={redirectFunction} key={Math.random()*Math.random()}></ProfileProject>
        }
        )
    }

    const projects = renderProjects()


    function copy() {
        let textoCopiado = document.getElementById('contact')
        let TextoToCopy =  textoCopiado?.innerText

        navigator.clipboard.writeText(TextoToCopy??'')
            .then(()=>alert('Contact copied'))
    }

    function exit() {
        clearStoragedUser()
        router.push('/auth')
    }


    async function redirectFunction(project:any) {
        await setStoragedProject(project)
        router.push('/editor')
    }


    if(!userAndProjects.name) {
        return <div id="project-loading">
                    <div className="loading-side" id='loading-full'></div>
                </div>
    } else {
        return (
        <>
            <Header title={userAndProjects.name}></Header>

            <FontAwesomeIcon
                icon={faDoorOpen}
                style={{color: 'red'}}
                id="logout"
                onClick={exit}
            />

            <main className="profile">
                <div className="profile-contact">

                        Contact:     
                        <p id='contact' >{userAndProjects.contact}</p>
                        <FontAwesomeIcon
                            icon={faCopy}
                            style={{color: 'white', margin: '0px 0px 0px 5px'}}
                            onClick={copy}
                            id="copy"
                        />
   
                </div>

                <hr />

                <article className='description bio'>
                    {bio ?? 'No bio yet'}
                </article>

                <Link href="/editProfile" className="edit-profile">
                    <button className="btn-1">Edit</button>
                </Link>

                <h2 id="all-projects">Your Projects</h2>
                <div className="profile-projects">{projects}</div>
            </main>
        </>
        )
    }
}