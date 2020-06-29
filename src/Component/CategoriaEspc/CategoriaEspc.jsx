import React, { Component } from 'react';

import '../Produto/Produto.css';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MenuSuperior from '../MenuSuperior/MenuSuperior';

class CategoriaEspc extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nulo: true,
          estado: false,
          prod: [{
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
          }],
          status: false,
        };
      };
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
        const { id } = this.props.match.params;
        return(
            <div>

            </div>
        )
      }
      
    
      //
      render() {
        return (
            <div>
            <MenuSuperior></MenuSuperior>
          <div className=" container">
              
            <div>{this.exibeErro() || this.exibeProduto()}</div>
          </div>
          </div>
        );
      };
    
}

export default CategoriaEspc;