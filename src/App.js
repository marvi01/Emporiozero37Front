import React from 'react';
import './App.css';
import HeaderSuperior from './Component/HeaderSuperior/HeaderSuperior';
import HeaderMeio from './Component/HeaderMeio/HeaderMeio';
import HeaderInferior from './Component/HeaderInferior/HeaderInferior';




import ProdutoEspc from './Component/ProdutoEspc/ProdutoEspc';
import TelaInicial from './Component/TelaInicial/TelaInicial';
import CategoriaEspc from './Component/CategoriaEspc/CategoriaEspc';
import Cadastro from './Component/Cadastro/Cadastro';
import { Switch, Route } from 'react-router-dom';
import Carrinho from './Component/Carrinho/Carrinho';
import Login from './Component/Login/Login';
import CalcularFrete from './Component/CalcularFrete/CalcularFrete';

function App() {
  return (
    <div className="corpo">

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
          <Route path="/Login" exact component={Login} />
          <Route path="/Cadastro" exact component={Cadastro} />
          <Route path="/frete" exact component={CalcularFrete} />
      </Switch>
    </div>
  );
}

export default App;
