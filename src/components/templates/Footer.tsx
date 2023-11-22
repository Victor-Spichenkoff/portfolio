export default function Footer(props:any) {
    function copyright () {
        return (<div style={{margin: 3}}>Copyright </div>)
    }

    return (<div className="footer-div">
        <footer className="footer">{copyright()}<strong>Victor Spichenkoff © 2023</strong></footer>
    </div>)
}