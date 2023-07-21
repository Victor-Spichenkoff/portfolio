import { baseUrl } from "@/global";
import axios from "axios";
import { getStoragedUser } from "./useUser";

async function  getProjects (setValue:any, page:number) {
    const user = getStoragedUser()

    axios.get(`${baseUrl}/project/fy/${user.id}?${page}`)
        .then(res => setValue(res.data))
        .catch(res => setValue({name:'Error'}))
}

export {getProjects}