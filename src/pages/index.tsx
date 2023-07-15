import { verifyAcess } from '@/hooks/useUser'

export default function Home() {
    verifyAcess('/home')
}
