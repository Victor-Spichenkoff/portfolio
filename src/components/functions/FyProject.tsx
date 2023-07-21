interface FyProjectProps {
    project:any
}
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXL7jgSSzXvzYJb8d08PmdtA7fqXKDrm5Raoaw8CNGc0Hm6pi8WNJwdhDnmNXHA-ZrFw&usqp=CAU'


export default function FyProject(props:FyProjectProps) {


    let imageUrl = props.project.imageUrl
    if(props.project==null) {
        imageUrl = defaultImage
    }

    return (
        <div className='project-on-fy'> {/*Click=redirecionar para a ver */}
            <img src={imageUrl} alt="Project Image" />
            <p>{props.project.name}</p>
            <div className="likes-user">
                <span>{props.project.likes}</span>
                <span>{props.project.user.name}</span>
            </div>
        </div>
    )
}