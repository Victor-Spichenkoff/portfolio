interface PropsButton{
    ph:string
    label:string
    value:string
    setValue:any
}

export default function Button(props:PropsButton) {

    return (
        <div className="edition-inputs">
            <label htmlFor="" className="edition-label">{props.label}</label> <br />
            <input type="text" placeholder={props.ph} onChange={(e:any)=> props.setValue(e.target.value)} value={props.value}/>
        </div>
    )
}