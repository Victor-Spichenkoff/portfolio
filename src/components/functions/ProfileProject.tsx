import Link from 'next/link'

import { faThumbsUp, faHeart  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ProfileProjectProps {
    project: any
    redirectFunction?:any
}

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYrVPkRSmtuY21h_fndYelp9BaHHM0FD7cA&usqp=CAU'

export default function ProfileProject(props: ProfileProjectProps) {
    const image = props.project.imageUrl ?? defaultImage
    return (
    // <Link href={`/viewProject?id=${props.project.id}`}>
        <article className="profile-project" onClick={() => {
            props.redirectFunction(props.project)
        }}
        >
            <img src={image} onError={(e:any)=>{
                e.target.src = defaultImage
                }}
                alt="Project Image" 
                id="profile-image"    
                /> <br />

        <div className="profile-project-name">{props.project.name}</div>


        <div id="profile-project-likes">{props.project.likes} 
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 17, marginLeft:5,color:'red'}}
            />    
        </div>

        </article>
    // </Link>
    )
}