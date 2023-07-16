// import s from '@/styles/template/header.module.css'
import { clearStoragedUser, guest } from '@/hooks/useUser'
import { useState } from 'react'
const imgUrl = 'https://cdn-icons-png.flaticon.com/512/93/93643.png'
import Link from 'next/link'

interface PropsHeader {
    title:string
    setShowMenu?:any
    showMenu?: boolean
    showAll?: boolean
}

export default function Header(props: PropsHeader) {
    let arrowDown:boolean = false

    function toggleMenu(target:any):void {
        const menu:any = document.getElementById('side-menu')
        const defaultDiv:any =  document.getElementById('default') 
        props.setShowMenu(props.showMenu ? false : true)
        if(props.showMenu) {
            console.log('down')
            defaultDiv.classList.remove('default-menu-closed')
            defaultDiv.classList.add('default')
            target.classList.remove('left')
            target.classList.add('down')
            menu.classList.add('showMenu')
            menu.classList.remove('hiddeMenu')
        } else {
            console.log('Left')
            target.classList.remove('down')
            target.classList.add('left')
            menu.classList.add('hiddeMenu')
            menu.classList.remove('showMenu')
            setTimeout(()=>{defaultDiv.classList.add('default-menu-closed'); defaultDiv.classList.remove('default')},2000)
        }
    }


    return (
        <>
        
        {props.showAll && !guest() ? ( <>
            <div className='header'>
                <i className="fa fa-lg"
                    onClick={(e)=>toggleMenu(e.target)}
                ><img src='https://cdn.icon-icons.com/icons2/788/PNG/512/down-arrow_icon-icons.com_64915.png' alt='Open/Close Menu' className="arrow drop-shadow-lg"/></i>
                <header className='text'>
                    <Link href="/home">
                        <h1>{props.title}</h1>
                    </Link>
                </header>
                <i className='fa fa-cogs'><img src={imgUrl} alt="Configurations" className='config-img'/></i>
            </div>
                </>) : (<>
                <div className="header header2">
                <header className='text' id='only-h1'>
                    <Link href="/home">
                        <h1>{props.title}</h1>
                    </Link>
                </header>
                {guest() ? (<Link className='login-guest' href='/auth' onClick={clearStoragedUser}>Make Login</Link>) : ('')}
                </div>
        </>)}
        </>
    )
    // return (
    //     <>
    //     <div className={s.header }>
    //     <i className="fa fa-lg">{'\<'}</i>
    //     <header className={s.text}>
    //         <a href="#">
    //             <h1>{props.title}</h1>
    //         </a>
    //     </header>
    //     <i className='fa fa-cogs'>C</i>
        
    //     </div></>
    // )
}