import React, { Component } from 'react';
import './MenuSuperior.css';
import { Link } from 'react-router-dom';
import logo from '../../imagens/Logo.png';
import login from '../../imagens/login.jpg'
import carrinho from '../../imagens/carrinho.png';

class MenuSuperior extends Component {
    render() {
        return (
            <div className="navigator">
                <div className=" headerpadrao ">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} placeholder="logo" />
                        </Link>

                    </div>
                    <div className="  input-group busca">
                        <input type="text" className="buscatam" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Button</button>
                        </div>
                        
                    </div>
                    <div className="comboFig ">
                        
                        <Link to="/Carrinho" ><img alt='some value' className="figuras " src={carrinho} /></Link>
                        <Link to="/Login" ><img alt='some value' className="figuras " src={login} /></Link>
                    </div>
                        

                </div>
            </div>

        )
    }
}
export default MenuSuperior;