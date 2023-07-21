import { useEffect, useState } from "react"
import FyProject from "./FyProject"
import { getProjects } from "@/hooks/useFy"
let vezes = 0

export default function Fy() {
    vezes++

    const [projects, setProjects] = useState([{name:'', user:{}}])
    const [page, setPage] = useState(0)

    

    function createPage () {

        // getProjects(setProjects, page)
        return projects.map((project) => {
            return (
                <FyProject project={project}></FyProject>
            )
        })
    }
    let constProjects = createPage()


    useEffect(()=>{
        console.log(vezes)
        getProjects(setProjects, page)
    },[page])


    return (
    <div className="fy-home">
        <h2 className='discovery'>Discovery</h2>
        <div className='fy'>
            {/* <FyProject project={projects[0]}></FyProject> */}
            {constProjects}
        </div>
        <button onClick={()=>{
            let p = page + 1
            setPage(p)
            console.log(page)
            getProjects(setProjects, page)}}>More</button>
    </div>
    )
}