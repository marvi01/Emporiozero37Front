import React from 'react';
import './App.css';


import Header from './Component/Header/Header';

import { Switch, Route } from 'react-router-dom';
import Login from './Component/Login/Login';


function App() {
  return (
    <div className="corpo">
     
      <Switch>
          <Route path="/" exact component={Header} />
          <Route path="/Produto/:id" exact component={Header} />
          <Route path="/Categoria/:id" component={Header} />
          <Route path="/Carrinho" exact component={Header} />
          <Route path="/Cadastro" exact component={Header} />
          <Route path="/frete" exact component={Header} />
          <Route path="/Login" exact component={Login} />
          
      </Switch>
    </div>
  );
}

export default App;
