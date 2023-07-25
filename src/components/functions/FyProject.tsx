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

    if(props.project.link == null) {
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
                    <span>{props.project.likes}</span>
                    <span>{props.project.user? props.project.user.name : ''}</span>
                </div>
            </div>
        </Link>
    )
}