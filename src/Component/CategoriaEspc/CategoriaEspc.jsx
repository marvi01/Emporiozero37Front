import React, { Component } from 'react';

import '../Produto/Produto.css';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MenuSuperior from '../MenuSuperior/MenuSuperior';
import CategProd from '../CategProduto/CategProduto';

class CategoriaEspc extends Component {

      exibeProduto() {
        const { id } = this.props.match.params;
        console.log(id)
        return(
            <div>
              <CategProd idCategoria={id}/>
            </div>
        )
      }
      
    
      //
      render() {
        return (
            <div>
          <div className=" container">
              
            <div>{  this.exibeProduto()}</div>
          </div>
          </div>
        );
      };
    
}

export default CategoriaEspc;