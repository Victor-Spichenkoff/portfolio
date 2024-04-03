import '@/styles/globals.css'
import '@/styles/template/default.css'
import '@/styles/template/header.css'
import '@/styles/auth/Auth.css'
import '@/styles/template/Error.css'
import '@/styles/functions/Editor.css'
import '@/styles/functions/fy.css'
import '@/styles/functions/viewProject.css'
import '@/styles/functions/profile.css'

import type { AppProps } from 'next/app'
import { getStoragedUser, setToken } from '@/hooks/useUser'



import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from 'react'
import axios from 'axios'
config.autoAddCss = false; 


const serverMaintenanceUrl = 'https://server-maintenance-ssu7.onrender.com'

export default function App({ Component, pageProps }: AppProps) {
  let user = getStoragedUser()

  async function MakeAllFirstRequest() {
    console.log('Tudo foi carregado')
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
