import { useRef, useState } from 'react'
import Jodit from 'jodit-react'

interface PropsEditor {
    setDescription:any
    description:string
}

export default function Editor(props:PropsEditor) {
    const editor =  useRef(null)
    const [content, setContent] = useState('')
    
    const configEditor = {
        readonly: false,
        height: 400,
        width: '80vw',
        placeholder: 'Write a description...'
    }

    const handleUpdate = (e:any) => {
        try{
            props.setDescription(e)
        } catch(e) {}
    }
    

    return (
        <div className="editor-edition">

            {/* <label htmlFor="" className='edition-label' id='label-editor'>Description</label> */}
            <Jodit
                ref={editor}
                value={props.description}
                config={configEditor}
                onBlur={handleUpdate}
                onChange={(e:any) => {}}
            />

        </div>
    )
}
