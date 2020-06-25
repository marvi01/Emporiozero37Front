import React, { Component } from 'react';
import './MenuSuperior.css';
import { a } from 'react-router-dom';
import log from '../../imagens/log.jpg';
import carrinho from '../../imagens/carro.png';
class MenuSuperior extends Component {
    render() {
        return (
            <div className= "headerpadrao"> 
            <nav  className="navbar navbar-expand-lg navbar-light bg-light headerpadrao ">
          
           <a to="/"><h2 className="titulo">EmporioZero37</h2></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <form className="form-inline my-2 my-lg-0 direita">
 
      <input className="form-control mr-sm-2" type="search" placeholder="Procurar" aria-label="Search"/>
      <button className="btn btn-outline-dark" type="submit">⌕</button>
      <a to="/Login" ><img alt='some value' className="figuras " src={log} /></a>
      <a to="/Carrinho" ><img alt='some value' className="figuras " src={carrinho} /></a>

    </form>
</nav>
</div>
         
        )
    }
}
export default MenuSuperior;