import { useCallback, useEffect, useRef, useState } from "react"
import FyProject from "./FyProject"
import { getProjects } from "@/hooks/useFy"
import { getStoragedUser } from "@/hooks/useUser"
import axios from "axios"
import { baseUrl } from "@/global"
let vezes = 0

let stop = false

export default function Fy() {
    vezes++

    const [projects, setProjects] = useState([{name:'', user:{}}])
    const [page, setPage] = useState(0)
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
        console.log('useEffect')
        getProjectsHere()
        // getProjects(setProjects, page, projects, setShowLoading)
    }, [])


    async function  getProjectsHere () {
      if(stop) return
      const user = getStoragedUser()
      // let pageUse = page >= 0 ? page-1 : page
  
      axios.get(`${baseUrl}/project/fy/${user.id}?page=${page}`)
          .then(res => {
            console.log(page, res.data)
              if(res.data.length==0)  {
                  stop = true
                  console.log('Fim')
                  setShowLoading(false)
                  return 
              }
              else{
                  if(page==0) {
                    // setPage(page+1)
                    console.log('primeiro', page)
                      setProjects(res.data)
                      return
                  } else {
                      return setProjects((previus:any[]) => {
                          // if(lastPage == page) {
                          //     return [...previus]
                          // }
                          // lastPage = page
                          // setPage(page => ++page)
                          return [...previus, ...res.data]
                      })}

                  }
          })
          .catch(res => console.log('erro no get'))
  }

  let pageLet = page

    useEffect(()=>{
        let observer = new IntersectionObserver((entries)=>{
            if(entries.some((entry) => entry.isIntersecting)) {
              setPage(old => {
                return old+1
              })
              getProjectsHere()
              // getProjects(setProjects, (currentPage+1), projects, setShowLoading)
              // setPage(old => ++old)
              console.log('nhe')
            }
        })
        try{
          observer.observe(document.getElementById('sentinela'))
        } catch(e) {console.log('erro no observer')}
    
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
    </div>
    )
}