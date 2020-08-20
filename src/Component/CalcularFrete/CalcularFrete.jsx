import React, { Component } from 'react'; //Importa o método componente e react
//import XMLToReact from 'xml-to-react';
import { parseXML } from 'jquery';



class CalcularFrete extends Component {
  async componentDidMount() {
    var response;
    try {
      //Buscando o parametro passado 

      response = await fetch('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
        {
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).then(data => {
        //.then(data=> {
        // console.log(data);
        //})
        console.log(data);
      }
      )
    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
  }
  render() {//Aqui acontece a renderização da página

    return (
      <p>oi :D</p>

    );
  }
}
export default CalcularFrete; //Aqui retorna o componente