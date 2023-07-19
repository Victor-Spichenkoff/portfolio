import { getStoragedUser, setToken, guest } from '@/hooks/useUser'
import axios from 'axios'
import { baseUrl } from '@/global'
import { useState } from 'react'
import Link from 'next/link'
import { setStoragedProject } from '@/hooks/useProject'


export default function SideMenu() {
    const [projects, setProjects] = useState([])





    function createSideMenu(projects:any) {
        return projects.map((project:any) => {
            return (
                <Link href={'/editor?id='+project.id} onClick={()=> setStoragedProject(project)}>
                    <div className='project-side-menu'>{project.name}</div>
                </Link>
            )
        })
    }


    function userProjects() {
        const user = getStoragedUser()
        axios.get(`${baseUrl}/project/${user.id}`)
            .then(res => setProjects(res.data.projects.projets))
    }
    userProjects()


    return(  
        <>
        { guest() ? '' : (    
            <aside className='side-menu' id='side-menu'>
                <Link href={'/editor'}>
                    <button className='btn-1 new-project-button'>New Project</button>
                </Link>
                {createSideMenu(projects)}
            </aside>
        )}

    </>
    )
}