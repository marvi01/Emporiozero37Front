import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProdutoEspc extends Component {
  constructor(props) {
    super(props);
    this.state =  {
        id: 0,
        nomeprod: "",
        descricao: "",
        foto: "",
        preco: 0,
        teor: 0,
        ml: 0,
        quantidade: 0,
        categoria_id: 0,
        created_at: "",
        updated_at: ""
      }
    
  }
  async componentDidMount() {
    var response;
    const { id } = this.props.match.params;

    try {
      response = await (await fetch(`https://anorosa.com.br/Emporio037/api/produto/${id}`));

    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();
    if (json != null) {
      this.setState( json )
    }
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
  formulario() {
    const { produto } = this.state.data;
    console.log(this.state.data);
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
        if (produto && produto.length) {
          const ProdCod = produto.map((item, indice) => {
            return (
              <div >
                <input value={item.nomeprod}></input>
              </div>
            )

          })
          return ProdCod;
        }else{
          const ProdCod =  
             (
              <div >
                 <h5 className="card-header">{this.state.nomeprod}</h5>
              </div>
            )

  
          return ProdCod;
          
        }
        
      }
    }
  }

  render() {
    return (
      <div>
        {console.log(this.state)}

      </div>
    );
  }
}

export default ProdutoEspc;