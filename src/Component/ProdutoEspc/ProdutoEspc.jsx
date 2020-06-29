/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EspProd.css';
import MenuSuperior from '../MenuSuperior/MenuSuperior';

class ProdutoEspc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valortotal: 0,
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
  handleInputRef = (input) => {
    this.input = input;
  };
  preco = () => {
    let qde = `${this.input.value}`;
    console.log(qde)
    let precofinal = qde * this.state.data.preco;
    this.setState({ valortotal: precofinal });

    console.log(precofinal);
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


    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
        return (
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
                <input ref={this.handleInputRef} onInput={this.preco} maxLength="2" /><br />

                <label className="h4">R${this.state.data.preco.toFixed(2).replace(".", ",")}</label><br />
                <label className="h4">Valor total:R${this.state.valortotal.toFixed(2).replace(".", ",")} </label>
                <div className=" ima"><br></br>
                  <Link to="/Carrinho" className="btn btn-success ">
                    Adicionar Carrinho
                    </Link>
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
  //
  render() {
    return (
      <div>
        
      <div className=" container">

        <div>{this.exibeErro() || this.exibeProduto()}</div>
      </div>
      </div>
    );
  };


};
export default ProdutoEspc;