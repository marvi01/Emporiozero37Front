/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './EspProd.css';
import { Redirect } from "react-router-dom";
import { createPortal } from 'react-dom';
//import { Link } from 'react-router-dom';
//import HeaderMeio from '../Header/HeaderMeio/HeaderMeio';
//import Carrinho from '../Carrinho/Carrinho';

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
        "QuantProd": 0,
        "ValorTotal": 0
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
    if (json.data != null) {
      this.setState({ data: jsonf, nulo: false });
      console.log(this.state.data);
      // this.setState(Object.assign(this.state.carrinho,{produto_id:id}));
    }
    this.setState({ estado: true });
    this.promocao()
  }

  //função para fazer acesso ao Input 
  handleInputRef = (input) => {
    this.input = input;
  };
  //Função para calcular o falor total do produto 
  preco = (qde) => {
    console.log(qde);
    //qde = qde + 1;
    var preco = parseFloat(this.state.data.preco);
    var desconto = parseFloat(this.state.data.desconto)/100;
    var valordescontado = preco * desconto * qde;
    let valor = preco * qde - valordescontado;
    console.log(qde);
    this.setState(prevState => ({
      data: { ...prevState.data, ValorTotal: valor }
    }));

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
  carrinho = () => {
    console.log(this.state.data);
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
          let prod = JSON.stringify(this.state.data);
          sessionStorage.setItem(this.state.data.id, prod);
          console.log(prod);
          this.setState({ redirect: true });
          alert("Atualizado no Carrinho com sucesso")

        }
      } else {
        console.log(qde);
        let prod = JSON.stringify(this.state.data);
        sessionStorage.setItem(this.state.data.id, prod);
        this.setState({ redirect: true });
        alert("Adicionado no Carrinho com sucesso")
      }
    }
  }
  promocao = () => {
    const preco = this.state.data.preco;
    const desconto = this.state.data.desconto;
    let valorr = 0;
    var obj;
    if (desconto === 0 || desconto === null) {
      valorr = preco;
      this.setState(prevState => ({
        data: { ...prevState.data, ValorTotal:valorr }
      }));
    } else {
      var valoratual = preco - preco * parseFloat(desconto) / 100;
      this.setState(prevState => ({
        data: { ...prevState.data, ValorTotal: valoratual }
      }));
      
    }
    
    return obj;
  }
  //HTML do Produto 
  exibeProduto() {
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
        var valor;
        if (this.state.data.desconto === 0) {
          valor= (
            <div className="bg-light p-4 mb-2 text-center">
              <h2 className="mb-0">R$ {parseFloat(this.state.data.ValorTotal).toFixed(2).replace(".", ",")}</h2>
            </div>
          )
        } else {
          valor= (<div className="bg-light p-4 mb-2 text-center">
          <span class="old-price text-muted">R${this.state.data.preco.toFixed(2).replace(".", ",")}</span>
          <span className="badge badge-success ml-2">{this.state.data.desconto}% OFF</span>
          <h2 className="mb-0">R${this.state.data.ValorTotal.toFixed(2).replace(".", ",")}</h2>
        </div>)
        }
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
                <div className="bg-white shadow">
                  <img id="product-image" className="img-fluid rounded " src={`https://anorosa.com.br/Emporio037/storage/${this.state.data.foto}`} alt={this.state.data.nomeprod} />
                </div>
              </div>
              <div className="col-md-6 col-lg mb-4 mb-md-0">

                {valor}
                <div id="form-quantity" className="py-2 bg-dark-brown rounded">
                  <div className="row no-gutters align-items-center py-2 bg-dark-brown rounded">
                  <div className="col-auto">
                      <div className="input-group" id="quantity">
                        <div className="input-group-append">
                          <button type="button" className="btn btn-reset text-middle-brown">
                            <i class="fas fa-minus" onClick={() => {

                              if (this.state.data.QuantProd > 1) {
                                this.setState(prevState => ({
                                  data: { ...prevState.data, QuantProd: this.state.data.QuantProd - 1 }
                                }));
                                this.preco(parseFloat(this.state.data.QuantProd) - 1);

                              }
                            }}></i>
                          </button>
                        </div>
                        <input ref={this.handleInputRef} type="text" className="input-quantity form-control-lg" name="quantItem" readonly="true" value={this.state.data.QuantProd} />
                        <div className="input-group-append">
                          <button type="button" className="btn btn-reset text-middle-brown" onClick={() => {
                            if(this.state.data.QuantProd < this.state.data.quantidade){
                            this.setState(prevState => ({
                                data: { ...prevState.data, QuantProd: this.state.data.QuantProd + 1 }              
                            }));
                            this.preco(parseFloat(this.state.data.QuantProd) + 1);
                            }else{
                              alert("Não há mais produtos deste tipo no estoque.")
                            }
                            

                          }}>
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                    <button onClick={this.carrinho} type="submit" className="btn d-block mx-auto text-white" >Adicionar</button>
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


function gerarJson(json) {
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
    "QuantProd": 1,
    "ValorTotal": 0
  };
}
/**
 * 
 */