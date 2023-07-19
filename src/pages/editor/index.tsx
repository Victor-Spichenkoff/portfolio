import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useState } from 'react';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })
import Header from '@/components/templates/Header';
import Button from '@/components/templates/ButtonEdition';
import { cancel, getStoragedProject, send, setStoragedProject } from '@/hooks/useProject';
import Link from 'next/link';
import Error from '@/components/templates/Error';
import { project_key } from '@/global';



export default function CreateProject() {
    const router = useRouter()
    const project = getStoragedProject()
    console.log(project)

    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [link, setLink] = useState('')

    const [showError, setShowError] = useState(false)
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})

    function rewriteProject() {
        setName(project.name)
        setLink(project.link)
        setImageUrl(project.imageUrl)
        setDescription(project.description)
    }
    if(project.id) {
        rewriteProject()
    }


    function handleResponse(res:any) {
        //Mostra a mensagem apropriada
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 201) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
            console.log(errorInfo)
        } else {
            setErrorInfo({type: 'success',  msg: 'Creating...'})
            setTimeout(()=> router.push('/home'), 1000)
        }
        setShowError(true)
        setTimeout(()=>setShowError(false), 6000)
    }



    return (
    <div className="creation-edition">
        { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}
        <Header showAll={false} title='New Project'></Header>
        <Button setValue={setName} value={name} ph='Insert Project name' label='Name'></Button>
        <Button setValue={setLink} value={link} ph='Insert a Link to your project' label='Link'></Button>
        <Button setValue={setImageUrl} value={imageUrl} ph='Insert a image URL' label='Image URL'></Button>

        
        <Editor setDescription={setDescription} description={description}/>

        <div className="div-actions-projects">
            <Link href={'/home'} onClick={cancel}>
                <button className='btn-1 cancel'>Cancel</button>
            </Link>
            {/* <Link href={'/home'} onClick={() => send(name, link, imageUrl, description)}> */}
                <button onClick={() => send(router, handleResponse, name, link, imageUrl, description, project.id)} className='btn-1 save'>Save</button>
            {/* </Link> */}
        </div>
    </div>
    )
}