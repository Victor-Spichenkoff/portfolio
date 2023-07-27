import { baseUrl } from "@/global";
import axios from "axios";
import { getStoragedUser } from "./useUser";

let stop:boolean = false
let lastPage = -1
async function  getProjects (setValue:any, page:number, projects:any, setShowLoading?:any) {
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
                    console.log('primeiro')
                    setValue(res.data)
                    return
                } else {
                    setValue((previus:any[]) => {
                        // if(lastPage == page) {
                        //     return [...previus]
                        // }
                        // lastPage = page
                        return [...previus, ...res.data]
                    })}

                }
        })
        .catch(res => console.log('erro no get'))
}

export {getProjects}

                        // // if(previus[page*3].link == res.data[0].link) return previus
                        // res.data.forEach((novo:any) =>  {
                        //     if(previus.some(old => old.link = novo.link)) {
                        //         return [...previus]
                        //     }  
                        // })