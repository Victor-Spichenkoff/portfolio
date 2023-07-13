interface PropsError {
    mensage: string
    type: string
}
export default function Error(props: PropsError) {
    return <div className={`${props.type}-mensage`}>{props.mensage}</div>
}