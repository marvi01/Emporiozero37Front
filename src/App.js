import React from 'react';
import './App.css';
import Contato from './Component/Contato/Contato';
import ProdutoEspc from './Component/ProdutoEspc/ProdutoEspc';
import MenuPrincial from './Component/MenuPrincipal/MenuPrincipal';
import MenuSuperior from './Component/MenuSuperior/MenuSuperior';
import CategoriaEspc from './Component/CategoriaEspc/CategoriaEspc';
import {Switch, Route} from 'react-router-dom';
import RotasMenuSup from './Component/MenuSuperior/RotasMenuSup';
import Carrinho from './Component/Carrinho/Carrinho';
function App() {
  return (
    <div className="corpo">
      

      <Contato/>
      <Switch>
      <Route path="/" exact  component={RotasMenuSup}/>
      <Route path = "/Produto/:id" exact component = {ProdutoEspc}/>
      <Route path ="/Categoria/:id"  component={CategoriaEspc}/>
      <Route path = "/Carrinho" exact component={Carrinho}/>
      </Switch>
    </div>
  );
}

export default App;
