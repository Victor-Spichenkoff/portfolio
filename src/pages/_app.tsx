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

  async function getIp() {
    const ip = await (await axios(`${localApiUrl}/api/getIp`)).data.ip
    return ip
  }


  async function MakeAllFirstRequest() {
    // const ip = await getIp()
    if(ip) axios(`${serverMaintenanceUrl}/sendIp/${ip}`)
    //deixar esse no final, o mais lento
    await axios(`${serverMaintenanceUrl}/forceAllOnce`)
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




// App.getInitialProps = async ({ ctx }: AppContext) => {
//   const { req } = ctx;
//   let ip = null;
//   if (req) {
//     ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     // Tratamento especial para IPv6 localhost (::1)
//     if (ip === '::1') {
//       ip = '127.0.0.1';
//     }
//   }
//   if(!ip) return { ip: 'Vazio' }
//   return { ip };
// };