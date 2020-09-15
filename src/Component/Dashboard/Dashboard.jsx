import React, { Component } from 'react'; //Importa o método componente e react
import './Dashboard.css';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import logo from '../../imagens/LOGO BRANCA.png';
import ProdutoIndex from './Produtos/ProdutoIndex';
import ProdutoCreate from './Produtos/ProdutoCreate';
import ProdutoUpdate from './Produtos/ProdutoUpdate';
import CategoriaIndex from './Categorias/CategoriaIndex';
import ImagensCreate from './ImagensDestaque/ImagensCreate';
import ImagensIndex from './ImagensDestaque/ImagensIndex';


class Dashboard extends Component {
  
    render() {//Aqui acontece a renderização da página
        return (
            <div>
                <div id="sidebar">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 col-md-12">
                            <img src={logo} id="sidebar-logo" alt="Logo empório zero37"/>
                            <span className="nav-link section-link mb-4">
                                <i className="fas fa-tachometer-alt mr-3"></i>
                                Painel de controle
                            </span>
                            <p className="sidebar-section-title">GERENCIAR</p>
                            <ul className="nav flex-column mb-4">
                                <li className="nav-item">
                                    <Link to={`/dashboard/categorias`} className="nav-link section-link">
                                        <i className="fas fa-list mr-3"></i>
                                        Categorias
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/dashboard/produtos`} className="nav-link section-link">
                                        <i className="fas fa-wine-bottle mr-3"></i>
                                        Bebidas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link section-link">
                                        <i className="fas fa-user mr-3"></i>
                                        Conta
                                    </a>
                                </li>
                            </ul>
                            <p className="sidebar-section-title">ADMINISTRAR</p>
                            <ul className="nav flex-column mb-0">
                                <li className="nav-item">
                                    <a href="#" className="nav-link section-link">
                                        <i className="fas fa-tags mr-3"></i>
                                        Promoções
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link section-link">
                                        <i className="fas fa-eye mr-3"></i>
                                        Destaques
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/dashboard/imagensDestaque`} className="nav-link section-link">
                                        <i className="fas fa-images mr-3"></i>
                                        Imagens em destaque
                                    </Link>
                                </li>
                            </ul>
                            <button id="sidebarCollapse2" type="button" className="center-button dashboard-collapse-button d-md-none">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        </div>
                    </div>
                </div>     
                <div id="dashboard-content">
                    <div id="dashboard-topbar" className="px-md-5">
                        <div className="flex-between justify-content-md-end">
                            <button id="sidebarCollapse" type="button" className="dashboard-collapse-button d-md-none">
                                <i className="fa fa-bars"></i>
                            </button>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" id="user-menu" data-toggle="dropdown">
                                    Ryan William
                                </button>
                                <div className="dropdown-menu" aria-labelledby="user-menu">
                                    <a className="dropdown-item" href="#">Minha conta</a>
                                    <a className="dropdown-item" href="#">Configurações</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Sair</a>
                                </div>
                            </div>
                        </div>
                    </div>         

                    <Switch>
                        <Route path="/dashboard/categorias" exact component={CategoriaIndex} />

                        <Route path="/dashboard/produtos/create" exact component={ProdutoCreate} />
                        <Route path="/dashboard/produtos/:id/edit" exact component={ProdutoUpdate} />
                        <Route path="/dashboard/produtos" exact component={ProdutoIndex} />
                        <Route path="/dashboard/imagensDestaque" exact component={ImagensIndex} />
                        <Route path="/dashboard/imagensDestaque/create" exact component={ImagensCreate} />

                    </Switch>
                </div>    
            </div>
        );
    }
}
export default Dashboard; //Aqui retorna o componente