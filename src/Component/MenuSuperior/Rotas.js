import React from 'react';
import ProdutoEspc from './Component/ProdutoEspc/ProdutoEspc';
import MenuPrincial from './Component/MenuPrincipal/MenuPrincipal';
import MenuSuperior from './Component/MenuSuperior/MenuSuperior';
import CategoriaEspc from './Component/CategoriaEspc/CategoriaEspc';
import {Switch, Route} from 'react-router-dom';

import Carrinho from './Component/Carrinho/Carrinho';
import Login from './Component/Login/Login';
function Rotas() {
  return (
    <div>
      <MenuSuperior/>
      <Switch>
      <Route path="/" exact  component={MenuPrincial}/>
      <Route path = "/Produto/:id" exact component = {ProdutoEspc}/>
      <Route path ="/Categoria/:id"  component={CategoriaEspc}/>
      <Route path = "/Carrinho" exact component={Carrinho}/>  
      </Switch>
    </div>
  );
}

export default Rotas;