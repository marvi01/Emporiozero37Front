/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EspProd.css';
import HeaderMeio from '../HeaderMeio/HeaderMeio';
import { Redirect } from "react-router-dom";
import Carrinho from '../Carrinho/Carrinho';

class ProdutoEspc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carrinho: {
        "quantidade": 0,
        "produto_id": 0,
        "user_id": 2
      },
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
      valortotal: 0,
      erro: null,
      nulo: true,
      estado: false,
      status: false,
      redirect: false
    };
  };
  // função que faz a Busca Na API 
  async componentDidMount() {
    var response;
    const { id } = this.props.match.params;
    try {
      //Buscando o parametro passado 
      
      response = await fetch('https://anorosa.com.br/Emporio037/api/produto/' + id);
    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();
    if (json != null) {
      this.setState({ data: json.data, nulo: false });
      this.setState(Object.assign(this.state.carrinho,{produto_id:id}));
    }
    this.setState({ estado: true });
  }
  //função para fazer acesso ao Input 
  handleInputRef = (input) => {
    this.input = input;
  };
  //Função para calcular o falor total do produto 
  preco = () => {
    let qde = `${this.input.value}`;
    console.log(qde)
    let precofinal = qde * this.state.data.preco;
    this.setState({ valortotal: precofinal });
    this.setState({Carrinho: this.state.data.id});
    
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
  //HTML do Produto 
  exibeProduto() {
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="externa">
              <div className="esquerda">
                <img className="imagem figure-img img-fluid rounded " src={`https://anorosa.com.br/Emporio037/storage/${this.state.data.foto}`} alt="Responsive image" />
              </div>
              <div className="titulos">
                <div className="posicao">
                  <h1 className=" ">{this.state.data.nomeprod}</h1><br />
                  <h4 className="">{this.state.data.descricao}-{this.state.data.ml}ML</h4>
                  <h4>Teor Alcoólico:{this.state.data.teor}%</h4>
                  <label className="h4">Quantidade: </label>
                  <input onChange={this.handleInputChange} name="quantidade" value={this.state.carrinho.quantidade} ref={this.handleInputRef} onInput={this.preco} maxLength="2" /><br />
                  <label className="h4">R${this.state.data.preco.toFixed(2).replace(".", ",")}</label><br />
                  <label className="h4">Valor total:R${this.state.valortotal.toFixed(2).replace(".", ",")} </label>
                  <div className=" ima"><br></br>
                    <button type="submit" className="btn btn-success ">
                      Adicionar Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
      } else {
        return (
          <div className="alert alert-light">
            <p>Nenhum produto encontrado :(</p>
          </div>)
      }
    }
  }
  handleSubmit = event => {
    fetch("https://anorosa.com.br/Emporio037/api/itemcarrinhouser/add", {
      method: "post",
      body: JSON.stringify(this.state.carrinho),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
          console.log(this.state.carrinho);
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));
    event.preventDefault();
  };
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      carrinho: { ...prevState.carrinho, [name]: value }
    }));
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
    return (
      <div>
        <div className=" container">
          <div>{this.exibeErro() || this.exibeProduto()}</div>
        </div>
      </div>
    );
    }
  };
};
export default ProdutoEspc;