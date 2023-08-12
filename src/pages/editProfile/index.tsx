import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })
import Header from '@/components/templates/Header';
import Button from '@/components/templates/ButtonEdition';
import { getStoragedUser, setStoragedUser } from '@/hooks/useUser';
import Link from 'next/link';
import Error from '@/components/templates/Error';
import { baseUrl, user_key } from '@/global';
import { VerifyAcess } from '@/hooks/useUser';
import axios from 'axios';


export default function EditProfile() {
    VerifyAcess()


    const router = useRouter()
    const user = getStoragedUser() ?? {}

    const [bio, setBio] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')

    const [showError, setShowError] = useState(false)
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})

    async function rewriteuser() {
        const user = await getStoragedUser() ?? {}
        setShowError(true)
        setName(user.name)
        setContact(user.contact)
        setBio(user.bio)
        setShowError(false)
    }

    useEffect(()=>{
        if(user.id) {
            rewriteuser()
        }
    }, [])



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


    function handleError(res:any) {
        console.log(res.response.data)
        setShowError(false)
        window.clearTimeout(0)

        setErrorInfo({type: 'error', msg: res.response.data })

        setShowError(true)
        setTimeout(()=>setShowError(false), 3500)
    }

    function handleSuccess(msg:string) {
        console.log('Sucesso')
        setShowError(false)
        window.clearTimeout(0)

        setErrorInfo({type: 'success',  msg})

        setShowError(true)
        setTimeout(()=> {
            router.push('/myProfile?id='+user.id)
            setShowError(false)
        }, 3500)

        recreateUserStoraged()
    }


    function recreateUserStoraged() {
        const currentUser = getStoragedUser()
        const final = {...currentUser, name, contact, bio}
        setStoragedUser(final)
    }


    function send() {
        console.log(bio)
        axios.post(`${baseUrl}/user/update`, {id:user.id, name, contact, bio})
            .then((r) => handleSuccess('Editing...'))
            .catch(e => handleError(e))
    }


    function remove() {

    }



    const title = user.name ?? router


    return (
    <div className="creation-edition">
        { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}

        <div id="header-edition">
            <Header showAll={false} title={title}></Header>
        </div>

        <Button setValue={setName} value={name} ph='Insert user name' label='Name'></Button>
        <Button setValue={setContact} value={contact} ph='Insert a way to contact you' label='Contact'></Button>
    
        <Editor setDescription={setBio} description={bio} placeholder='Create a bio'/>

        <div className="div-actions-projects">
            <Link href={'/myProfile?id='+user.id}>
                <button className='btn-1 cancel'>Cancel</button>
            </Link>
            {user.id? (            
                <button className='btn-1 delete' onClick={remove}>Delete</button>
                 ): ''}

            <button onClick={send} className='btn-1 save'>Save</button>
        </div>
    </div>
    )
}

// {"id":"5b1f1fbf-9ac2-4906-aed7-b50bdfd79e84",
// "name":"Yudi",
// "contact":"987654322",
// "bio":null,
// "iat":1690662130,
// "exp":1693254130,
// "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjViMWYxZmJmLTlhYzItNDkwNi1hZWQ3LWI1MGJkZmQ3OWU4NCIsIm5hbWUiOiJZdWRpIiwiY29udGFjdCI6Ijk4NzY1NDMyMiIsImJpbyI6bnVsbCwiaWF0IjoxNjkwNjYyMTMwLCJleHAiOjE2OTMyNTQxMzB9.caEzbXMTQlcnO966jfB3vaLZ3KsjVSSM8dLo_InCF6E",
// "status":200}