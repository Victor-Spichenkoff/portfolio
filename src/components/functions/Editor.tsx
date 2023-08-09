import { useRef, useState } from 'react'
import Jodit from 'jodit-react'

interface PropsEditor {
    setDescription?:any
    description:string
    readonly?: boolean
    placeholder?:string
}

export default function Editor(props:PropsEditor) { const editor =  useRef(null)
    const [content, setContent] = useState('')
    
    const configEditor = {
        readonly: props.readonly,
        height: 400,
        width: '80vw',
        placeholder: props.placeholder ??'Write a description...',
        showBlocks: {
            enable: props.readonly,
            color: '#ccc',
            tagList: ['p', 'div', '...']
        }
    }

    const handleUpdate = (e:any) => {
        try{
            props.setDescription(e)
        } catch(e) {}
    }
    

    return (
        <div className="editor-edition" id='editor'>

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
