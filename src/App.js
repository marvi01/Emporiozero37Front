import React from 'react';
import './App.css';
import Contato from './Component/Contato/Contato';
import ProdutoEspc from './Component/ProdutoEspc/ProdutoEspc';
import TelaInicial from './Component/TelaInicial/TelaInicial';
import MenuSuperior from './Component/MenuSuperior/MenuSuperior';
import CategoriaEspc from './Component/CategoriaEspc/CategoriaEspc';
import {Switch, Route} from 'react-router-dom';

import Carrinho from './Component/Carrinho/Carrinho';
import Login from './Component/Login/Login';
function App() {
  return (
    <div className="corpo">
      

      <Contato/>{/*Header do site*/}

      <MenuSuperior/>
      <Switch>
      <Route path="/" exact  component={TelaInicial}/>
      <Route path = "/Produto/:id" exact component = {ProdutoEspc}/>
      <Route path ="/Categoria/:id"  component={CategoriaEspc}/>
      <Route path = "/Carrinho" exact component={Carrinho}/>
      <Route path = "/Login" exact component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
