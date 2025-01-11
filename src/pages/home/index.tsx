import { VerifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'
import Fy from '../../components/functions/fy'

let verify = true
export default function Home() {
  VerifyAcess()

  
  
  return (
    <Default title='Portfolios' showAllHeader={true}>
      {/* 'Olá' */}
      <Fy></Fy>
    </Default>
  )

}''
