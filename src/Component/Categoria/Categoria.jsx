/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Produto from '../Produto/Produto';
import './Categoria.css';

class Categoria extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nulo: true,
      estado: false,
      categ: [{
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
      response = await fetch("https://anorosa.com.br/Emporio037/api/categoria/list");

    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();
    if (json != null) {
      this.setState({ categ: json, nulo: false });
    }
    this.setState({ estado: true });


  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }
  exibeProduto() {
    const { categ } = this.state.categ;
    console.log(this.state);
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
              
          const CatCod = categ.map((item, indice) =>{
                return(
                  <div key={indice} className='categoria'>
                      <div className="nomeitem">
                         <p>
                            {item.nomecategoria}
                        </p>
                      </div>
                      
                      <Produto idcat = {item.id}/>
                  </div>
                )
                
              })
              
            return CatCod;

      } else {
        return (
          <div className="alert alert-light">
            <p>Nenhuma Categoria encontrada :(</p>
          </div>)
      }
    }
  }
  //
  render() {
    return (

      <div className=" container">

        <div>{this.exibeErro() || this.exibeProduto()}</div>
      </div>
    );
  };


};
export default Categoria;