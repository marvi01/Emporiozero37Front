/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Produto.css';


class Produto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "data": [{
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
      "status": false
    };
  };
  componentDidMount() {
    fetch("https://anorosa.com.br/Emporio037/api/produto/list")
      .then(data => data.json().then(data => this.setState({ data })))
      .catch(erro => this.setState(erro));

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
    const { data } = this.state.data;
    if (data && data.length) {
      const Prod = data.map((item, indice) => (

        <div key={indice} className="card tamanho group" >
          <img className="card-img-top foto" src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} />
          <div text align="center " className="card-body desc">
            <h5 className="card-title">{item.nomeprod}</h5>
            <p>{item.teor}</p>



          </div>
        </div>
      )
      )
      return Prod;
    } else {
      return (
        <div className="alert alert-light">
          <p>Nenhum produto encontrado :(</p>
        </div>)
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
export default Produto;