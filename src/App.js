import React from 'react';
import './App.css';
import Produto from './Component/Produto/Produto';
import Contato from './Component/Contato/Contato';
import Destaque from './Component/Destaque/Destaque';
import ProdutoEspc from './Component/ProdutoEspc/ProdutoEspc';
import MenuPrincial from './Component/MenuPrincipal/MenuPrincipal';
import {Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div >
      

      <Contato/>
      
      <Switch>
      <Route path="/" exact  component={MenuPrincial}/>
      <Route path = "/Produto/:id" exact component = {ProdutoEspc}/>
      
      </Switch>
    </div>
  );
}

export default App;
