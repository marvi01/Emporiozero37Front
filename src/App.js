import React from 'react';
import './App.css';


import Header from './Component/Header/Header';
import Dashboard from './Component/Dashboard/Dashboard';
import VerificarIdade from './Component/VerificarIdade/VerificarIdade';



import { Switch, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Cadastro from './Component/Cadastro/Cadastro';



function App() {
  return (
    <div className="corpo">
     
      <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/categorias" exact component={Dashboard} />

          <Route path="/dashboard/produtos/create" exact component={Dashboard} />
          <Route path="/dashboard/produtos/:id/edit" exact component={Dashboard} />
          <Route path="/dashboard/produtos" exact component={Dashboard} />
          <Route path="/dashboard/imagensDestaque" exact component={Dashboard} />
          <Route path="/dashboard/imagensDestaque/create" exact component={Dashboard} />


          <Route path="/" exact component={Header} />
          <Route path="/Produto/:id" exact component={Header} />
          <Route path="/Categoria/:id" component={Header} />
          <Route path="/Carrinho" exact component={Header} />
          <Route path="/frete" exact component={Header} />
          <Route path="/Cadastro" exact component={Cadastro} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Admin/AdicionaProduto" exact component={Header}/>
          <Route path="/Admin/Produto" exact component={Header}/>
          <Route path="/Admin" exact component={Header} />
          <Route path="/Admin/Categoria" exact component={Header} />
          <Route path="/Admin/Destaque" exact component={Header} />
          <Route path="/Admin/Carrossel" exact component={Header} />
          <Route path="/Admin/AdicionarCategoria" exact component={Header} />
          <Route path="/Admin/AtualizarCategoria/:id" exact component={Header}/>
          <Route path="/Admin/AtualizarProduto/:id" exact component = {Header}/>
          <Route path="/Admin/AdicionarCarousel" exact component = {Header}/>
          <Route path="/FinalizarCompra" exact component={Header} />
          <Route path="/Perfil" exact component = {Header}/>
          <Route path="/Perfil/Enderecos/Cadastrar/:id" exact component = {Header}/>
          <Route path="/Perfil/Senha/Editar" exact component = {Header}/>
          <Route path="/Perfil/Editar" exact component = {Header}/>
          <Route path="/Perfil/Enderecos/Editar/:id" exact component = {Header} />
      </Switch>
    </div>
  );
}

export default App;
