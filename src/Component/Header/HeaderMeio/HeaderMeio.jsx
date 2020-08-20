import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../imagens/LOGO BRANCA.png';

export default function HeaderMeio() {
    const [logado, setLogado] = useState(false);
    const [estado, setEstado] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("JWT_token"));


    /*constructor(props) {
        super(props);
        this.state = {
            logado: false,
            estado: false,
            user: {
                "id": 0,
                "nome": "",
                "type": 0,
                "telefone": "",
                "nasc": "",
                "email": "",
                "email_verified_at": null,
                "created_at": "",
                "updated_at": ""
            },

        };
    };*/
    async function conexao() {

        var response;
        
        if (token !== null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
            };
            try {
                response = await fetch("https://anorosa.com.br/Emporio037/api/me", requestOptions);
            } catch (error) {

            }
            const json = await response.json();
            console.log(json);
            if (json.status !== false) {
                setUser(json);
                setLogado(true);
            } else {
                localStorage.removeItem("JWT_token");
            }

        }
        setEstado(true);
    }

    useEffect(() => {
        setEstado(false);
        setLogado(false);

        conexao();

    }, [token]);



    function menu() {
        if (estado === true) {
            if (logado === false) {
         //       
                return (
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-middle-brown" to="/Login">
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                                Login
                                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-middle-brown" to="/Cadastro">
                                <i className="fas fa-user-plus mr-2"></i>
                                            Cadastro
                        </Link>
                        </li>
                    </ul>
                )//}
            } else {
                if(user.type ===0){
                return (
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="/Carrinho">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                            Carrinho
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown nav-link">
                                <button className="btn-reset dropdown-toggle text-dark-brown" type="button" id="categorias" data-toggle="dropdown">
                                    <i className="fas fa-user-circle mr-2"></i>
                                               Conta
                            </button>
                                <div className="dropdown-menu bg-dark">
                                    <Link className="dropdown-item text-light pl-4 py-2" to="/Carrinho">
                                        <i className="fas fa-user-circle mr-2"></i>
                                            Editar conta
                            </Link>
                                    <span className="dropdown-item text-light pl-4 py-2" onClick={logout}>
                                        <i className="fas fa-user-circle mr-2"></i>
                                            Sair
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                )
            }else if(user.type ===1){
                //Header Meio de Administrador
                return (
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="/Carrinho">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                            Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div class="dropdown nav-link">
                                <button className="btn-reset dropdown-toggle text-dark-brown" type="button" id="categorias" data-toggle="dropdown">
                                    <i className="fas fa-user-circle mr-2"></i>
                                               Conta
                            </button>
                                <div className="dropdown-menu bg-dark">
                                    <Link className="dropdown-item text-light pl-4 py-2" to="/Carrinho">
                                        <i className="fas fa-user-circle mr-2"></i>
                                            Editar conta
                            </Link>
                                    <span className="dropdown-item text-light pl-4 py-2" onClick={logout}>
                                        <i className="fas fa-user-circle mr-2"></i>
                                            Sair
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                )
            }
        }
        } else {
            return (
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-dark-brown" to="/">
                            <i className="fas fa-spinner mr-2"></i>
                                                Carregando
                    </Link>
                    </li>
                </ul>
            )
        }
    }

   async function logout() {
        var response;
        let confirma = window.confirm('Você está saindo de sua conta');
        if (confirma) {



            if (token != null) {
                try {
                    response = await fetch("https://anorosa.com.br/Emporio037/api/logout?token=" + token, { method: 'POST' }).then((resposta) => {
                        if (resposta.ok) {
                            localStorage.removeItem("JWT_token");
                            localStorage.removeItem("users");
                            setUser(true);
                            window.location.reload();
                        }
                    });
                } catch (error) {

                }
                const json = await response.json();
                if(json.status === false){
                }
                window.location.reload(false);
            }
            
        }

    }
    return (
        <div className="header-middle py-4 bg-dark">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-4 col-lg-2">
                        <Link to="/">
                            <img src={logo} alt="Emporio 037" className="img-fluid" />
                        </Link>
                    </div>
                    <div className="col">
                        <div className="row justify-content-end">
                            <div className="col-lg-6">
                                {menu()}
                                <div className="input-group shadow-sm">
                                    <input type="text" className="form-control" placeholder="Vodka absolut..." />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}
