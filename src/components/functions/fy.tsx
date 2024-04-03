import { useCallback, useEffect, useRef, useState } from "react"
import FyProject from "./FyProject"
import { getProjects } from "@/hooks/useFy"
import { getStoragedUser } from "@/hooks/useUser"
import axios from "axios"
import { baseUrl } from "@/global"

let stop = false



export default function Fy() {

    const [projects, setProjects] = useState([{name:'', user:{}}])
    const [page, setPage] = useState(0)
    const [showLoading, setShowLoading] = useState(true)
    const [stop, setStop] = useState(false)


  async function getProjectsHere (page?:number) {
      if(stop) return
      // let pageUse = page >= 0 ? page-1 : page
      const user = getStoragedUser()

    function verifySentinelaExit() {
      const sentinela = document.getElementById('sentinela')
      const currentHeight = 0
      console.log(currentHeight)
    }

    verifySentinelaExit()

      axios.get(`${baseUrl}/project/fy/${user.id}?page=${page}`)
          .then(res => {
            console.log(page, res.data)
              if(res.data.length==0)  {
                  setStop(true)
                  setShowLoading(false)
                  return 
              }
              else{
                // console.log(projects)
                // console.log(res.data)
                if(page==0) {
                  setProjects(res.data)
                } else{
                  setProjects((old:any) => {
                    try{
                      if(old[page*4].id == res.data[0].id) return [...old]
                    } catch(e) {}
                    return [...old, ...res.data]
                  })
                }
              }
          })
          .catch(res => console.log('erro no get'))
  }


    useEffect(()=>{
      // setInterval(()=>{


        let observer = new IntersectionObserver((entries)=>{
          if(entries.some((entry) => entry.intersectionRect)) {
            setPage(old => {
              getProjectsHere(old)
              return old+1
            })
            console.log('nhe')
          }
        })


        try{
          observer.observe(document.getElementById('sentinela'))
        } catch(e) {console.log('erro no observer')}
    
        if(!showLoading) {
          return  observer.disconnect()
        }
      // }, 1000)
    }, [])

    

    return (
    <div className="fy-home">
        <h2 className='discovery'>Discovery</h2>
        <hr />
        
        <div className='fy'>
            {projects.map((project) => {
              return (
                <FyProject project={project} key={Math.random()*Math.random()}></FyProject>
              )
            })}
        </div>

        {showLoading ? (
          <div id="sentinela">
            <img src="https://metodosupera.com.br/supera-quiz-soft-skills/src/images/loading.gif" alt='Loading...' />
          </div>
        ) : (<div className="no-more-projects"><p>That&apos;s all</p></div>)}
    </div>
    )
}