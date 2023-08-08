import { getStoragedUser, setToken, guest } from '@/hooks/UseUser'
import axios from 'axios'
import { baseUrl } from '@/global'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { setStoragedProject } from '@/hooks/useProject'


export default function SideMenu() {
    const [projects, setProjects] = useState([])





    function createSideMenu(projects:any) {
        return projects.map((project:any, index:any) => {
            return (<>
                <Link href={'/editor?id='+project.id} onClick={()=> setStoragedProject(project)} key={index}>
                    <div className='project-side-menu'>{project.name}</div>
                </Link>
            </>)
        })
    }


    function userProjects() {
        const user = getStoragedUser()
        axios.get(`${baseUrl}/project/${user.id}`)
            .then(res => setProjects(res.data.projects.projets))
            .catch()
    }
    useEffect(() => userProjects(), [])
    
    const menu = projects[0] ? createSideMenu(projects) : <div className="loading-side"></div>

    return(  
        <>
        { guest() ? '' : (    
            <aside className='side-menu' id='side-menu'>
                <Link href={'/editor'}>
                    <button className='btn-1 new-project-button'>New Project</button>
                </Link>
                {menu}
                {/* <div className="loading-side"></div> */}
            </aside>
        )}

    </>
    )
}