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
import AdminCateg from '../Administrador/AdminCateg/AdminCateg';
import AdminDestaque from '../Administrador/AdminDestaque/AdminDestaque';
import EditCarrossel from '../Administrador/EditCarrossel/EditCarrossel';

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
          <Route path="/Admin/AdicionaProduto" exact component={AddProd}/>
          <Route path="/Admin/Produto" exact component={ListProd}/>
          <Route path="/Admin" exact component={Admin} />
          <Route path="/Admin/Categoria" exact component={AdminCateg} />
          <Route path="/Admin/Destaque" exact component={AdminDestaque} />
          <Route path="/Admin/Carrossel" exact component={EditCarrossel} />
      </Switch>
    </div>
  );
}

export default Header;
