import { verifyAcess } from '@/hooks/useUser'

export default function NotFound() {

    verifyAcess('/home', 4000)
    return (
        <div className="not-exists-page">
            Page not exists
            <p>You will be redirected</p>
        </div>
    )
}