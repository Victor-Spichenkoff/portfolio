import { useState } from "react"
import Header from "./Header"
import SideMenu from './SideMenu'
import Footer from './Footer'
import Content from './Content'

interface PropsDefault{
    title:string
    children:any
}

export default function Default(props: PropsDefault) {
  const [showMenu, setShowMenu] = useState(false)

    return (
      <div className="default" id="default">
            <Header title={props.title} setShowMenu={setShowMenu} showMenu={showMenu}></Header>
            
            <Content>
              <SideMenu></SideMenu>
              {props.children}
            </Content>
            
            <Footer />
      </div>

    )
  }