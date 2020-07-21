import React, { Component } from 'react'; //Importa o método componente e react



class CalcularFrete extends Component {
    async componentDidMount() {
        var response;
    try {
      //Buscando o parametro passado 
      
      response = await fetch('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=35590000&sCepDestino=35570496&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3', 
      {
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin':'*'
        }}
      );
    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response;
    console.log(json);
      
      }
    render() {//Aqui acontece a renderização da página
        
        return (
        <p>oi :D</p>
            
        );
    }
}
export default CalcularFrete; //Aqui retorna o componente