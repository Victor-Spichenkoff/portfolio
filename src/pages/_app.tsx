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
import { MakeAllFirstRequest } from '@/utils/ip'
import { useRouter } from 'next/router'
import { SendIp } from '@/hooks/sendIp'

config.autoAddCss = false; 

const isProd = process.env.NODE_ENV == "production"

const localApiUrl = isProd ? '/portfolio' : ''


interface NewAppProps extends AppProps {
  ip?: string
}

export default function App({ Component, pageProps, ip }: NewAppProps) {
// export default function App({ Component, pageProps, ip }: AppProps) {
  let user = getStoragedUser()

  SendIp()

  if (user) {
    setToken(user)
  }
  return <Component {...pageProps} />
  // return <Home/>
}