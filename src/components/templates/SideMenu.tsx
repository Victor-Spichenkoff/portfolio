import { getStoragedUser, setToken, guest } from '@/hooks/useUser'
import axios from 'axios'
import { baseUrl } from '@/global'
import { useState } from 'react'
import Link from 'next/link'


export default function SideMenu() {
    const [projects, setProjects] = useState([])

    function createSideMenu(projects:any) {
        return projects.map((project:any) => {
            return (<div>{project.name}</div>)
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
                    <button className='bg-sky-500'>New Project</button>
                </Link>
                {createSideMenu(projects)}
            </aside>
        )}

    </>
    )
}