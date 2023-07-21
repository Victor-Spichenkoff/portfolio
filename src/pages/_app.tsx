import '@/styles/globals.css'
import '@/styles/template/default.css'
import '@/styles/template/header.css'
import '@/styles/auth/Auth.css'
import '@/styles/template/Error.css'
import '@/styles/functions/Editor.css'
import '@/styles/functions/fy.css'

import type { AppProps } from 'next/app'
import { getStoragedUser, setToken } from '@/hooks/useUser'


export default function App({ Component, pageProps }: AppProps) {
  let user = getStoragedUser()
  if (user) {
    setToken(user)
  }
  return <Component {...pageProps} />
  // return <Home/>
}
