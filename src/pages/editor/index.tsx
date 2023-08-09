import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })
import Header from '@/components/templates/Header';
import Button from '@/components/templates/ButtonEdition';
import { cancel, clearStoragedProject, deleteProject, getStoragedProject, send, setStoragedProject } from '@/hooks/useProject';
import Link from 'next/link';
import Error from '@/components/templates/Error';
import { project_key } from '@/global';
import { VerifyAcess } from '@/hooks/useUser';



export default function CreateProject() {
    VerifyAcess()

    const router = useRouter()
    const project = getStoragedProject() ?? {}

    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [link, setLink] = useState('')

    const [showError, setShowError] = useState(false)
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})

    async function rewriteProject() {
        const project = await getStoragedProject() ?? {}
        setShowError(true)
        setName(project.name)
        setLink(project.link)
        setImageUrl(project.imageUrl)
        setDescription(project.description)
        setShowError(false)
    }

    useEffect(()=>{
        if(project.id) {
            rewriteProject()
        }
    }, [])



    function handleResponse(res:any, successMsg:string='Success') {
        //Mostra a mensagem apropriada
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 204) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
            console.log(errorInfo)
        } else {
            setErrorInfo({type: 'success',  msg: successMsg})
            clearStoragedProject()
            setTimeout(()=> router.push('/home'), 1000)
        }
        setShowError(true)
        setTimeout(()=>setShowError(false), 6000)
    }


    function handleDelete(res:any) {
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 202) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
            console.log(errorInfo)
        } else {
            setErrorInfo({type: 'success',  msg: 'Deleting...'})
            setTimeout(()=> router.push('/home'), 1000)
        }
        setShowError(true)
        setTimeout(()=>setShowError(false), 6000)
    }



    const title = project.name ?? 'New Project'


    return (
    <div className="creation-edition">
        { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}
        <div id="header-edition" onClick={clearStoragedProject}>
        <Header showAll={false} title={title}></Header>
        </div>

        <Button setValue={setName} value={name} ph='Insert Project name' label='Name'></Button>
        <Button setValue={setLink} value={link} ph='Insert a Link to your project' label='Link'></Button>
        <Button setValue={setImageUrl} value={imageUrl} ph='Insert a image URL' label='Image URL'></Button>
    
        <Editor setDescription={setDescription} description={description}/>

        <div className="div-actions-projects">
            <Link href={'/home'} onClick={cancel}>
                <button className='btn-1 cancel'>Cancel</button>
            </Link>
            {project.id? (            
                <button className='btn-1 delete' onClick={()=> deleteProject(project.id, handleResponse)}>Delete</button>
                 ): ''}

            <button onClick={() => send(router, handleResponse, name, link, imageUrl, description, project.id)} className='btn-1 save'>Save</button>
        </div>
    </div>
    )
}