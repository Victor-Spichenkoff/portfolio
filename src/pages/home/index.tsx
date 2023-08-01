import { verifyAcess } from '@/hooks/useUser'
import Default from '../../components/templates/Default'
import Fy from '@/components/functions/Fy'

import { stringToHtml } from '@/hooks/useProject'
import { useState } from 'react'
export default function Home() {
  verifyAcess()
  
  try{
    <Default title='Portfolios' showAllHeader={true}>
      {/* 'Olá' */}
      <Fy></Fy>
    </Default>
  } catch(e) {}
}
