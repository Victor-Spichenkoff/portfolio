import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import Link from 'next/link'
import { useEffect, useState } from 'react'


interface FyProjectProps {
    project:any
}
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYrVPkRSmtuY21h_fndYelp9BaHHM0FD7cA&usqp=CAU'


export default function FyProject(props:FyProjectProps) {
    let imageUrl = props.project.imageUrl
    
    let redirectProject = `/viewProject?id=${props.project.id}`
    let redirectUser = `/viewProfile?id=${props.project.user.id}`

    if(!props.project.imageUrl)  imageUrl = defaultImage

    if(props.project.id == null) {
        return ''
    }
    
    if(props.project.name=='Infinite Scroll') {
        redirectProject = ('/home')
        redirectUser = ('/home')
    }

    return (
        <Link href={redirectProject}>
            <div className='project-on-fy' >

                <img src={imageUrl} 
                    onError={(e:any)=>{
                        e.target.src = defaultImage
                    }}
                    alt="Project Image" />  



                <p id='fy-name'>{props.project.name}</p>
                <div className="likes-user">
                    <span>{props.project.likes}             
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ fontSize: 14, marginLeft:5,color:'red'}}
                    />   </span>
                    <span>
                        <abbr title="View Profile">
                        <Link href={redirectUser}>
                            {props.project.user? props.project.user.name : ''}
                        </Link>
                        </abbr>
                    </span>
                </div>
            </div>
        </Link>
    )
}