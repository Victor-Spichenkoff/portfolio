import { VerifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'
import Fy from '../../components/functions/fy'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

let verify = true
export default function Home() {
  VerifyAcess()

  
  return (
    <Default title='Portfolios' showAllHeader={true}>
      {/* 'Olá' */}
      <Fy></Fy>
    </Default>
  )

}
