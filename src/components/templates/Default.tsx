import { useState } from "react"
import Header from "./Header"
import SideMenu from './SideMenu'
import Footer from './Footer'
import Content from './Content'
import { guest } from "@/hooks/useUser"

interface PropsDefault{
    title:string
    children:any
    showAllHeader?: any
}

export default function Default(props: PropsDefault) {
  const [showMenu, setShowMenu] = useState(false)

    return (
      <div className="default" id="default">
            <Header title={props.title} setShowMenu={setShowMenu} showMenu={showMenu} showAll={props.showAllHeader}></Header>
            
            <Content>
              <SideMenu></SideMenu>
              {props.children}
            </Content>
            
            <Footer />
      </div>

    )
  }