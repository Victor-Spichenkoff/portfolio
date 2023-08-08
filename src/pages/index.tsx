import { verifyAcess } from '@/hooks/UseUser'

export default function Home() {
    verifyAcess('/home')
}
