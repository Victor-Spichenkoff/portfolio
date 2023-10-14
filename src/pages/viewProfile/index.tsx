import { useRouter } from "next/router"
import ProfileProject from "@/components/functions/ProfileProject"
import { baseUrl } from "@/global"
import axios from "axios"
import { useEffect, useState } from "react"
import { getStoragedUser, VerifyAcess } from "@/hooks/useUser"
import Header from "@/components/templates/Header"
import { redirect } from "next/dist/server/api-utils"
import { stringToHtml } from "@/hooks/useProject"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"



export default function ViewProfile() {
    // VerifyAcess()


    const router = useRouter()
    
    const [userAndProjects, setUserAndProjects] = useState<any>({projets:[{likes:0}]})

    useEffect(()=>{
        axios.get(`${baseUrl}/profile/${router.query.id}`)
            .then(res => setUserAndProjects(res.data))
            .catch(console.log)

        // setTimeout(() => {
        //     axios.get(`${baseUrl}/profile/${router.query.id}`)
        //     .then(res => setUserAndProjects(res.data))
        //     .catch(console.log)
        // }, 2000);
    }, [])


    const bio = stringToHtml(String(userAndProjects.bio))


    function renderProjects() {
        return userAndProjects.projets.map((project:any ) => {
            return <ProfileProject project={project} redirectFunction={redirect}key={Math.random()*Math.random()}></ProfileProject>
        }
        )
    }

    const projects = renderProjects()


    function copy() {
        let textoCopiado = userAndProjects.contact
        textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("O texto é: " + textoCopiado.value);
    }

    function redirect(project:any) {
        router.push(`/viewProject?id=${project.id}`)
    }



    if(!userAndProjects.name) {
        return <div id="project-loading">
        <div className="loading-side" id='loading-full'></div>
    </div>
    } else {
        return (
        <>
            <Header title={userAndProjects.name}></Header>
            <main className="profile">
                <div className="profile-contact">

                        Contact:     
                        {'    '+ userAndProjects.contact}
                        <FontAwesomeIcon
                            icon={faCopy}
                            style={{color: 'white', margin: '0px 0px 0px 5px'}}
                            onClick={copy}
                            id="copy"
                        />
   
                </div>
                <article className='description bio'>
                    {bio == 'null'|| bio==null ? 'No bio yet' : bio}
                </article>

                <h2 id="all-projects">All Projects</h2>
                <div className="profile-projects">{projects}</div>
            </main>
        </>
        )
    }
}