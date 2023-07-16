import { verifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'

import { stringToHtml } from '@/hooks/useProject'
export default function Home() {
  verifyAcess()
  const t = '<h1>Batata</h1><p>Batata 2</p>'
  return (
    <Default title='Portfolios' showAllHeader={true}>
      'Olá'
    </Default>
  )
}
