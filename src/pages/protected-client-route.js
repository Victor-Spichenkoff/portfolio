import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

function ProtectedClient() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      // Se o usuário não estiver autenticado, redirecione ele para a página `/profile`
      .catch(() => router.push('/profile'))
  }, [])
  if (!user) return null
  return <h1>Hello {user.username} from client route!</h1>
}
export default ProtectedClient