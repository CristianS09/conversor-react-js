import './Historico.css';

//Interface para definir como os dados seram armazenado no array
interface Moeda {
    valorAdicionado: string,
    tipoConversao: string,
    valor: string,
    date: Date
};

function Historico({ valorAdicionado, tipoConversao, valor, date }: Moeda) {
    return <>
        <div className="historico">
            <h3>{tipoConversao}</h3>
            <p>Valor Adicionado: {valorAdicionado}</p>
            <p>Conversão: {valor}</p>
            <p>Data: {date.toLocaleDateString()}</p>
            <p>Hora: {date.toLocaleTimeString()}</p>
        </div>
    </>
};

export default Historico;