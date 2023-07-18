import dynamic from 'next/dynamic';
import { useState } from 'react';
const Editor = dynamic(() => import('@/components/functions/Editor'), { ssr: false })
import Header from '@/components/templates/Header';
import Button from '@/components/templates/ButtonEdition';
import { cancel, send } from '@/hooks/useProject';
import Link from 'next/link';


export default function CreateProject() {
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [link, setLink] = useState('')

    
    return (
    <div className="creation-edition">
        <Header showAll={false} title='New Project'></Header>
        <Button setValue={setName} value={name} ph='Insert Project name' label='Name'></Button>
        <Button setValue={setLink} value={link} ph='Insert a Link to your project' label='Link'></Button>
        <Button setValue={setImageUrl} value={imageUrl} ph='Insert a image URL' label='Image URL'></Button>

        
        <Editor setDescription={setDescription} description={description}/>

        <div className="div-actions-projects">
            <Link href={'/home'} onClick={cancel}>
                <button>Cancel</button>
            </Link>
            {/* <Link href={'/home'} onClick={() => send(name, link, imageUrl, description)}> */}
                <button onClick={() => send(name, link, imageUrl, description)}>Save</button>
            {/* </Link> */}
        </div>
    </div>
    )
}