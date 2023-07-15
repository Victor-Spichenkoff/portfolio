import { verifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'

export default function Home() {
  verifyAcess()
  return (
    <Default title='Portfolios' showAllHeader={true}>
      'Olá'
    </Default>
  )
}
