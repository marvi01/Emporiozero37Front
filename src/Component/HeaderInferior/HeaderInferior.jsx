import React, { Component } from 'react'; //Importa o método componente e react
import './HeaderInferior.css';

class HeaderInferior extends Component {
    render() {//Aqui acontece a renderização da página
        return (
            <div className="header-bottom  bg-dark-brown ">
                <div className="container">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <a class="navbar-brand text-middle-brown" href="#">Emporio</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#categorias">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="categorias">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Vodkas <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Tequilas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Wisky</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
export default HeaderInferior; //Aqui retorna o componente