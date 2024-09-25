import { serverMaintenanceUrl } from "@/global"
import axios from "axios"

export async function getIp(notForce: boolean) {
    try {
        const res = await axios.get('https://ipapi.co/json/')
        // return `[PORTFOLIO] ${res.data.ip} -> ${res.data.city}, ${res.data.country_name}`
        return {
            ip:  notForce ? "MEU" : res.data.ip,
            city: res.data.city,
            country: res.data.country_name
        }
    } catch (e) {
        console.log('Erro ao pegar o ip:')
        console.log(e)
    }
}


export async function MakeAllFirstRequest(notForce: boolean) {
    console.log(notForce)
    const ipInfo = await getIp(notForce)
    const stringForNotMine = `[PORTFOLIO] ${ipInfo.ip} -> ${ipInfo.city}, ${ipInfo.country}`
    try {
        if (ipInfo.ip == "MEU")
            return axios(`${serverMaintenanceUrl}/sendIp/[PORTFOLIO] [MEU]`)

        if (stringForNotMine) axios(`${serverMaintenanceUrl}/sendIp/${stringForNotMine}`)

        if (notForce)
            return

        //deixar esse no final, o mais lento
        await axios(`${serverMaintenanceUrl}/forceAllOnce`)
    } catch (E) {
        console.log('Erro nos Make All Request')
        console.log(E)
    }
}