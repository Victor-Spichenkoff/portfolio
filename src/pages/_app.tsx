import '@/styles/globals.css'
import '@/styles/template/default.css'
import '@/styles/template/header.css'
import '@/styles/auth/Auth.css'
import '@/styles/template/Error.css'

import type { AppProps } from 'next/app'
import Home from './home'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  // return <Home/>
}
