import React from 'react';


import ProdutoEspc from '../ProdutoEspc/ProdutoEspc';
import MenuPrincial from '../MenuPrincipal/MenuPrincipal';
import MenuSuperior from './MenuSuperior';
import {Switch, Route} from 'react-router-dom';
function RotasMenuSup() {
  return (
    <div>
      <MenuSuperior/>
      <Switch>
      <Route path="/" exact  component={MenuPrincial}/>
      <Route path = "/Produto/:id" exact component = {ProdutoEspc}/>
      
      </Switch>
    </div>
  );
}

export default RotasMenuSup;
