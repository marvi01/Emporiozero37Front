import React, { Component } from 'react';
import './HeaderSuperior.css';
//import { Link } from 'react-router-dom';
class HeaderSuperior extends Component { //Nós temos um componente, que ao ser chamado vai exibir no site o html dentro de render()


    render() {
        return (
            <div className="bg-dark text-light d-sm-block" id="header-top">
                <div className="container-md">
                    <div className="row align-items-center">
                        <div className="col">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="cor nav-link" href="https://api.whatsapp.com/send?phone=5537998393353&text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20relativa%20ao%20Emp%C3%B3rio037.">(37) 99839-3353</a>
                                </li>
                                <li className="nav-item">
                                    <a className="cor nav-link" href="https://api.whatsapp.com/send?phone=5537998559165&text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20relativa%20ao%20Emp%C3%B3rio037.">(37) 99855-9165</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-auto">
                            <ul className="nav social-icons">
                                <li className="nav-item">
                                    <a className="nav-link" href="https://www.instagram.com/emporiozero37" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderSuperior;