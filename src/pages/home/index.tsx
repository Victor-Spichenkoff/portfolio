import { VerifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'
import Fy from '../../components/functions/Fy'

import { useRouter } from 'next/router'


export default function Home() {
  VerifyAcess()
  
  return (
    <Default title='Portfolios' showAllHeader={true}>
      {/* 'Olá' */}
      <Fy></Fy>
    </Default>
  )

}
