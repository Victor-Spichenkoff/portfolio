interface PropsContent {
    children:any
}

export default function Content(props:PropsContent) {
    return (
        <main className="content">
            {props.children}
        </main>
    )
}