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
      quantItem: 1,
      data: [{
        "id": 0,
        "nomeprod": "",
        "descricao": "",
        "desconto": 0,
        "destaque": 0,
        "foto": "",
        "preco": 0,
        "teor": 0,
        "ml": 0,
        "quantidade": 0,
        "categoria_id": 0,
        "created_at": "",
        "updated_at": "",
        "QuantProd":1
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
    
    const jsonf = gerarJson(json);
    console.log(json);
    if (json != null) {
      this.setState({ data: jsonf, nulo: false });
      console.log(this.state.data);
      // this.setState(Object.assign(this.state.carrinho,{produto_id:id}));
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
    this.setState({ Carrinho: this.state.data.id });

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
  logado = () => {
    let log = localStorage.getItem("JWT_token");
    if (log && log.length) {
      return (
        
          <button onClick={this.carrinho} type="submit" className="btn d-block mx-auto text-white" >Adicionar</button>
        
      )
    } else {
      return (
        
          <button onClick={this.carrinho} type="submit" className="btn d-block mx-auto text-white" disabled>Adicionar</button>
        
      )
    }
  }
  carrinho = () => {
    let qde = this.state.data.quantItem;
    let obj = sessionStorage.getItem(this.state.data.id)
    if (qde === 0) {
      alert("Digite algum valor na quantidade ");
    }
    else if (qde !== 0) {
      if (obj && obj.length) {
        let confirma = window.confirm("Deseja atualizar a quantidade de " + this.state.data.nomeprod + " ?")
        if (confirma) {
          console.log(qde);
          let prod = JSON.stringify(this.state);
          sessionStorage.setItem(this.state.data.id, prod);
          console.log(prod);
          this.setState({ redirect: true });
          alert("Atualizado no Carrinho com sucesso")

        }
      } else {
        console.log(qde);
        let prod = JSON.stringify(this.state);
        sessionStorage.setItem(this.state.data.id, prod);
        console.log(prod);
        this.setState({ redirect: true });
        alert("Adicionado no Carrinho com sucesso")
      }
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
                <div className="product-info">
                  <div className="product-info-icon">
                    <i class="fas fa-info"></i>
                  </div>
                  <div className="product-info-text">
                    <h2 className="h6">Descrição:</h2>
                    <p>{this.state.data.descricao}</p>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-info-icon">
                    <i class="fas fa-percentage"></i>
                  </div>
                  <div className="product-info-text">
                    <h2 className="h6">Teor Alcoólico</h2>
                    <p>{this.state.data.teor}%</p>
                  </div>
                </div>
                <div className="product-info">
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

                {promocao(this.state.data.preco, this.state.data.desconto)}
                <div id="form-quantity" className="py-2 bg-dark-brown rounded">
                  <div className="row no-gutters align-items-center py-2 bg-dark-brown rounded">
                    <div className="col-auto">
                      <div className="input-group" id="quantity">
                        <div className="input-group-append">
                          <button type="button" className="btn btn-reset text-middle-brown">
                            <i class="fas fa-minus" onClick={() => {
                              if (this.state.quantItem > 1) {
                                this.setState({ quantItem: this.state.quantItem - 1 })
                              }
                            }}></i>
                          </button>
                        </div>
                        <input onChange={this.handleInputChange} ref={this.handleInputRef} type="text" className="input-quantity form-control-lg" name="quantidade" readonly="true" value={this.state.quantItem} />
                        <div className="input-group-append">
                          <button type="button" className="btn btn-reset text-middle-brown" onClick={() => { this.setState({ quantItem: this.state.quantItem + 1 }) }}>
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      {this.logado()}
                    </div>
                  </div>
                </div>
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
  /*handleSubmit = event => {
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
  };*/
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

function promocao(preco, desconto) {
  if (desconto === 0 || desconto === null) {
    return (<div className="bg-light p-4 mb-2 text-center">
      <h2 className="mb-0">R$ {parseFloat(preco).toFixed(2).replace(".", ",")}</h2>
    </div>);
  } else {
    var valoratual = preco - preco * parseFloat(desconto) / 100;
    return (<div className="bg-light p-4 mb-2 text-center">
      <span class="old-price text-muted">R${preco.toFixed(2).replace(".", ",")}</span>
      <span className="badge badge-success ml-2">{desconto}% OFF</span>
      <h2 className="mb-0">R${valoratual.toFixed(2).replace(".", ",")}</h2>
    </div>);
  }
}
function gerarJson(json){
 return {
    "id": json.data.id,
    "nomeprod": json.data.nomeprod,
    "descricao": json.data.descricao,
    "desconto": json.data.desconto,
    "destaque": json.data.destaque,
    "foto": json.data.foto,
    "preco": json.data.preco,
    "teor": json.data.teor,
    "ml": json.data.ml,
    "quantidade": json.data.quantidade,
    "categoria_id": json.data.categoria_id,
    "created_at": json.data.created_at,
    "updated_at": json.data.updated_at,
    "QuantProd":1
};
}