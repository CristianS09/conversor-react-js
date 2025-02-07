import { useEffect, useState } from "react";
import './Conversor.css';
import dolar from '../../assets/dolar.png'
import Historico from "../Historico/Historico";
function Conversor() {


    //Interface para definir como os dados seram armazenado no array
    interface Moeda {
        valorAdicionado: string,
        tipoConversao: string,
        valor: string,
        date: Date
    }

    //UseState
    const [event, setEvent] = useState<string>('');
    const [dolarAtual, setDolarAtual] = useState<string>('');
    const [exibirValor, setExibirValor] = useState<string>('');
    const [historico] = useState<Moeda[]>([]);

    //Chama a função de requisição a api quando o app é carregado
    useEffect(
        () => {
            valorDolar();
        }, []
    );

    //Função para pagar o valor do input
    function valorInput(event: React.ChangeEvent<HTMLInputElement>) {
        setEvent(event.target.value);
        if (event.target.value === '') {
            setExibirValor('');
        }
    }

    //Converte o valor do dolar para Real
    function dolarParaReal() {
        //Verifica se o campo foi preenchido
        if (event !== '') {
            //Converte o valor do input para número
            const valor = Number.parseInt(event);
            //Faz o calculo do converter o dolar para real
            const calculo: number = valor * Number.parseFloat(dolarAtual);
            const resultado = ' = ' + calculo.toFixed(2).concat(' R$ ');
            //Atribui o resultado para o useState
            setExibirValor(resultado);
            //Adiciona os valores no array para exibir o histórico
            historico.push({ tipoConversao: 'Dolar para Real', valorAdicionado: event.concat('USD'), valor: resultado.replace('=', ''), date: new Date() });
        } else {
            //Alerta caso o campo esteja vázio
            alert('O campo está vázio');
        }
    }

    //Converte o valor do real para dolar
    function realParaDolar() {
        //Verifica se o campo foi preenchido
        if (event !== '') {
            //Converte o valor do input para número
            const valor = Number.parseInt(event);
            //Faz o calculo do converter o real para dolar
            const calculo: number = valor / Number.parseFloat(dolarAtual);
            const resultado = ' = ' + calculo.toFixed(2).concat(' USD ');
            //Atribui o resultado para o useState
            setExibirValor(resultado);
            //Adiciona os valores no array para exibir o histórico
            historico.push({ tipoConversao: 'Real para Dolar', valorAdicionado: event.concat('R$'), valor: resultado.replace('=', ''), date: new Date() });
        } else {
            //Alerta caso o campo esteja vázio
            alert('O campo está vázio');
        }
    }

    //Obtem o valor atual do dolar
    async function valorDolar(): Promise<void> {
        //Try-Catch
        try {
            //Faz uma requisição a api
            const data = await fetch('https://economia.awesomeapi.com.br/last/USD');
            const resultado = await data.json();
            //Obtem o valor do dolar atual
            const real: string = resultado.USDBRL.bid;
            //Atribui o valor ao useState
            setDolarAtual(real);
        } catch (err) {
            //Alerta se ocorrer algum erro na requisição
            alert('Ocorreu um erro');
        }
    }

    return <main>
        <img src={dolar} width={150} />
        <h1>Conversor</h1>
        <div className="resultado">
            <input onChange={valorInput} type="number" placeholder="Valor da converção" min={0} />
            <p> {exibirValor}</p>
        </div>
        <button onClick={dolarParaReal} id="dolar">Converter Dolar para Real</button>
        <button onClick={realParaDolar} id="real">Converter Real para Dolar</button>
        {historico.length == 0 ? null : <>
            <h3>Histórico</h3>
            <div className="Historico">
                {historico.map((e) => {
                    return <>
                        {/*Componente para exibir o histórico*/}
                        <Historico
                            valorAdicionado={e.valorAdicionado}
                            valor={e.valor}
                            date={e.date}
                            tipoConversao={e.tipoConversao}
                        />
                    </>;
                })}
            </div>
        </>}
    </main>
}

export default Conversor;