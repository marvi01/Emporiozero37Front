import React, { Component } from 'react';
import './MenuSuperior.css';
import { Link } from 'react-router-dom';
import logo from '../../imagens/Logo.png';

class MenuSuperior extends Component {
    render() {
        return (
            <div className="navigator">
                <nav className="navbar navbar-expand-lg navbar-light bg-light headerpadrao ">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} />
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="categorias ">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item active">
                                    <Link className="navbar-brand" to="/Funcionarios" > <p>Funcionarios</p> </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand" to="/Estoque"> Estoque </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand" to="/Vendas"> Vendas </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand" to="/Produtos"> Produtos </Link>
                                </li>
                            </ul>



                        </div>
                    </div>
                </nav>
            </div>
            
        )
    }
}
export default MenuSuperior;