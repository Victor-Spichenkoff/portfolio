import { getStoragedUser, setToken, guest } from '@/hooks/useUser'


export default function SideMenu() {
    return(  
        <>
        { guest() ? '' : (    <aside className='side-menu' id='side-menu'>
    <button>Novo Projeto</button>
    <p>P1</p>
    <p>P2</p>
    <p>P3</p>
    <p>P4</p>
    </aside>) }

    </>
    )
}