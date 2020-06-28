/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProdutoEspc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nulo: true,
      estado: false,
      data: [{
        "id": 0,
        "nomeprod": "",
        "descricao": "",
        "foto": "",
        "preco": 0,
        "teor": 0,
        "ml": 0,
        "quantidade": 0,
        "categoria_id": 0,
        "created_at": "",
        "updated_at": ""
      }],
      status: false,
    };
  };
  async componentDidMount() {
    var response;
    try {
      const { id } = this.props.match.params;
      response = await fetch('https://anorosa.com.br/Emporio037/api/produto/' + id);

    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();
    if (json != null) {
      this.setState({ data: json.data, nulo: false });
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
    console.log(this.state.data.nomeprod);
    
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {

        

          return (
            <div>
              <b>{this.state.data.nomeprod}</b>
              <b>{this.state.data.preco}</b>
            </div>
          )


        

      } else {
        return (
          <div className="alert alert-light">
            <p>Nenhum produto encontrado :(</p>
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
export default ProdutoEspc;