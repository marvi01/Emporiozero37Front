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
         <div className="container py-5">
            <h1 className="h3 text-center">{this.state.data.nomeprod}</h1>
            <hr className="mb-5" />
           <div className="row">
             
             <div className="order-last order-md-0 order-lg-first col-md-6 col-lg">
               <div className="product-esp-info">
                    <div className="product-info-icon">
                        <i class="fas fa-info"></i>
                    </div>
                    <div className="product-info-text">
                        <h2 className="h6">Descrição:</h2>
                        <p>{this.state.data.descricao}</p>
                    </div>
                </div>
                <div className="product-esp-info">
                    <div className="product-info-icon">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <div className="product-info-text">
                        <h2 className="h6">Teor Alcoólico</h2>
                        <p>{this.state.data.teor}%</p>
                    </div>
                </div>
                <div className="product-esp-info">
                    <div className="product-info-icon">
                        <i className="fas fa-wine-bottle"></i>
                    </div>
                    <div className="product-info-text">
                        <h2 className="h6 p-0">Volume</h2>
                        <p>{this.state.data.ml} ml</p>
                    </div>
                </div>
             </div>
             <div className="order-first order-lg-0 mb-4 mb-lg-0 col-lg-5 col-xl-6">
                <div className="bg-white">
                  <img id="product-image" className="img-fluid rounded " src={`https://anorosa.com.br/Emporio037/storage/${this.state.data.foto}`} alt={this.state.data.nomeprod} />
                </div>
             </div>
             <div className="col-md-6 col-lg mb-4 mb-md-0">
                <div className="bg-light p-4 mb-2 text-center">
                    <span class="old-price text-muted">R$ 100,00</span>
                    <span className="badge badge-success ml-2">50% OFF</span>
                    <h2 className="mb-0">R$ {this.state.data.preco.toFixed(2).replace(".", ",")}</h2>
                </div>
                <form action="" onSubmit={this.handleSubmit} id="form-quantity" className="py-2 bg-dark-brown rounded">
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="input-group" id="quantity">
                        <div className="input-group-append">
                            <button type="button" className="btn btn-reset text-middle-brown">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input onChange={this.handleInputChange} ref={this.handleInputRef} type="text" className="input-quantity form-control-lg" name="quantidade" readonly="true" value={this.state.carrinho.quantidade}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-reset text-middle-brown">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn d-block mx-auto text-white">Adicionar</button>
                    </div>
                  </div>
                </form>
             </div>
           </div>
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