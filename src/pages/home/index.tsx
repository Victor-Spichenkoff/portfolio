import { verifyAcess } from '@/hooks/UseUser'
import Default from '../../components/templates/Default'
import Fy from '@/components/functions/Fy'

import { useRouter } from 'next/router'


export default function Home() {
  verifyAcess()
  
  return (
    <Default title='Portfolios' showAllHeader={true}>
      {/* 'Olá' */}
      <Fy></Fy>
    </Default>
  )

}
