/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Produto from './Produto/Produto';

import './Categoria.css';

class ExibeCategoria extends Component { //Nós temos um componente

  constructor(props) { //Este construtor cria algo semelhante as constantes que temos no hook, mas de forma menos compacta
    super(props);
    this.state = { //Cria o estado inicial
      nulo: true, //Valor que nos dirá se a api foi nula
      estado: false, //Valor que nos dirá se a api já foi consultada
      data: [{ //Aqui nós temos os valores a serem recebidos da api
        "id":0,
        "nomecategoria":"",
        "created_at":"",
        "updated_at":""
      }],
      status: false,
    };
  };
  async componentDidMount() {
    var response;
    try {
      response = await fetch("https://anorosa.com.br/Emporio037/api/categoria/list"); //Aqui a api é consultada

    } catch (error) {
      console.log(error);
      this.setState({ error }) //Caso dê uma resposta diferente de 200 o estado é setado para o erro
    }
    const json = await response.json(); //Converte a resposta em json
    if (json.data != null) { //Caso o json não seja nulo
      this.setState({ data: json, nulo: false }); //o valor de categoria é setado e também seta que não é nulo
    }
    this.setState({ estado: true });//Informa que a api foi consultada


  }

  exibeErro() {//Metodo para caso dê erro na api
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }
  exibeProduto() {//Metodo para caso não dê erro
    const { data } = this.state.data;//Criamos uma constante que recebe os valores do estado de categoria
    if (this.state.estado === true) {//Se a api já foi consultada
      if (this.state.nulo === false) {//Se o resultado da api não for nulo
          
        //É criado um array html que lista as categorias
          const CatCod = data.map((item, indice) =>{
            
                return(
                  <div key={indice} className='categoria'>
                      <div className="nomeitem">
                         <p>
                            {item.nomecategoria}
                        </p>
                      </div>
                      
                      
                      <Produto idcat = {item.id}/> {/*Aqui é puxado o componente produto, em ./Produto/Produto.jsx, enviando o valor do id da categoria */}
                     
                      
                  </div>
                )
                
              })
              
            return CatCod;

      } else {//Caso não existam categorias cadastradas retorna o seguinte html:
        return (
          <div className="alert alert-light">
            <p>Nenhuma Categoria encontrada :(</p>
          </div>)
      }
    }
  }
  //
  render() {//Aqui nós renderizamos nossas funções, caso dê erro exibe o HTML retornado em exibeErro(), e caso não, exibe o HTML retornado em exibeProduto()
    return (

      <div className=" container">

        <div>{this.exibeErro() || this.exibeProduto()}</div>
      </div>
    );
  };


};
export default ExibeCategoria;