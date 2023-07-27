import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import Link from 'next/link'


interface FyProjectProps {
    project:any
}
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYrVPkRSmtuY21h_fndYelp9BaHHM0FD7cA&usqp=CAU'


export default function FyProject(props:FyProjectProps) {
    function getStaticProps() {
        projects: props.project
    }

    let imageUrl = props.project.imageUrl
    if(!props.project.imageUrl) {
        imageUrl = defaultImage
    }

    if(props.project.id == null) {
        return ''
    }

    return (
        <Link href={`/viewProject?id=${props.project.id}`} >
            <div className='project-on-fy' > {/*Click=redirecionar para a ver */}

                <img src={imageUrl} 
                    onError={(e)=>{
                        e.target.src = defaultImage
                    }}
                    alt="Project Image" />  



                <p>{props.project.name}</p>
                <div className="likes-user">
                    <span>{props.project.likes} <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{ fontSize: 20, color: "white", marginLeft:5 }}
                        /> </span>
                    <span>
                        <abbr title="View Profile">
                        <Link href={`/viewProfile?id=${props.project.user.id}`}>
                            {props.project.user? props.project.user.name : ''}
                        </Link>
                        </abbr>
                    </span>
                </div>
            </div>
        </Link>
    )
}