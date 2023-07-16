import parse from 'html-react-parser'

function stringToHtml(file:string){
    return parse(file)
}
const teste = ` <h1>Testando o db</h1>
<p>Nhe to com fome</p>`
console.log(stringToHtml(teste))

export { stringToHtml }