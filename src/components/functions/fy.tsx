import { useCallback, useEffect, useRef, useState } from "react"
import FyProject from "./FyProject"
import { getProjects } from "@/hooks/useFy"
let vezes = 0

export default function Fy() {
    vezes++

    const [projects, setProjects] = useState([{name:'', user:{}}])
    const [page, setPage] = useState(0)
    const [showMore, setShowMore] = useState(true)
    const [showLoading, setShowLoading] = useState(true)

    const loaderRef = useRef(null)

    function createPage () {
        getProjects(setProjects, page, projects)

        return projects.map((project) => {
            return (
                <FyProject project={project}></FyProject>
            )
        })
    }
    

    // let constProjects = createPage()


    useEffect(()=>{
        getProjects(setProjects, page, projects)
    }, [])


    useEffect(()=>{
        let observer = new IntersectionObserver((entries)=>{
            if(entries.some((entry) => entry.isIntersecting)) {
              setPage(currentPage => {
                getProjects(setProjects, currentPage+1, projects, setShowLoading)

                console.log(page, projects)

                return currentPage + 1
              })
              console.log('nhe')
            }
        })

        observer.observe(document.getElementById('sentinela'))
    
        if(!showLoading) {
          return  observer.disconnect()
        }
    }, [])

    

    return (
    <div className="fy-home">
        <h2 className='discovery'>Discovery</h2>
        <div className='fy'>


            {projects.map((project) => {
              return (
                <FyProject project={project}></FyProject>
              )
            })}
        </div>

        {showLoading ? (
          <div id="sentinela">
            <img src="https://metodosupera.com.br/supera-quiz-soft-skills/src/images/loading.gif" alt='Loading...' />
          </div>
        ) : (<div className="no-more-projects"><p>That's all</p></div>)}

        {/* {showMore}
        <button onClick={()=>{
            let p = page + 1
            setPage(p)
            console.log(page)
            getProjects(setProjects, page, projects, setShowMore)}
            }
        >More</button> */}
    </div>
    )
}