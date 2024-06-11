import '@/styles/globals.css'
import '@/styles/template/default.css'
import '@/styles/template/header.css'
import '@/styles/auth/Auth.css'
import '@/styles/template/Error.css'
import '@/styles/functions/Editor.css'
import '@/styles/functions/fy.css'
import '@/styles/functions/viewProject.css'
import '@/styles/functions/profile.css'
import type { AppContext, AppProps } from 'next/app'
import { getStoragedUser, setToken } from '@/hooks/useUser'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from 'react'
import axios from 'axios'


config.autoAddCss = false; 

const isProd = process.env.NODE_ENV == "production"
const serverMaintenanceUrl = isProd ? 'https://server-maintenance-ssu7.onrender.com' : 'http://localhost:2009'
const localApiUrl = isProd ? '/portfolio' : ''


interface NewAppProps extends AppProps {
  ip?: string
}

export default function App({ Component, pageProps, ip }: NewAppProps) {
// export default function App({ Component, pageProps, ip }: AppProps) {
  let user = getStoragedUser()

  async function getIp () {
    try{
      const res = await axios.get('https://ipapi.co/json/')
      return `${res.data.ip} -> ${res.data.city}`
    } catch (e) {
        console.log('Erro ao pegar o ip:')
        console.log(e)
    }
  }


  async function MakeAllFirstRequest() {
    const ip = await getIp()
    try {
      if(ip) axios(`${serverMaintenanceUrl}/sendIp/${ip}`)
      //deixar esse no final, o mais lento
      await axios(`${serverMaintenanceUrl}/forceAllOnce`)
    } catch(E) {
      console.log('Erro nos Make All Request')
      console.log(E)
    }
  }

  useEffect(()=> {
    MakeAllFirstRequest()
  }, [])


  if (user) {
    setToken(user)
  }
  return <Component {...pageProps} />
  // return <Home/>
}