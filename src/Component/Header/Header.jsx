import React from 'react';
import '../../App.css';
import HeaderSuperior from './HeaderSuperior/HeaderSuperior';
import HeaderMeio from './HeaderMeio/HeaderMeio';
import HeaderInferior from './HeaderInferior/HeaderInferior';




import ProdutoEspc from '../ProdutoEspc/ProdutoEspc';
import TelaInicial from '../TelaInicial/TelaInicial';
import CategoriaEspc from '../CategoriaEspc/CategoriaEspc';
import Cadastro from '../Cadastro/Cadastro';
import { Switch, Route } from 'react-router-dom';
import Carrinho from '../Carrinho/Carrinho';
import CalcularFrete from '../CalcularFrete/CalcularFrete';
import AddProd from '../Administrador/AdminProd/AddProd';
import ListProd from '../Administrador/AdminProd/ListProd';
import Admin from '../Administrador/Admin';

function Header() {
  return (
    <div>

      <header>
            <HeaderSuperior />
            <HeaderMeio />
            <HeaderInferior />
      </header>
     
      <Switch>
          <Route path="/" exact component={TelaInicial} />
          <Route path="/Produto/:id" exact component={ProdutoEspc} />
          <Route path="/Categoria/:id" component={CategoriaEspc} />
          <Route path="/Carrinho" exact component={Carrinho} />
          <Route path="/Cadastro" exact component={Cadastro} />
          <Route path="/frete" exact component={CalcularFrete} />
          <Route path="/AddProd" exact component={AddProd}/>
          <Route path="/AdminProd" exact component={ListProd}/>
          <Route path="/Admin" exact component={Admin} />
      </Switch>
    </div>
  );
}

export default Header;
