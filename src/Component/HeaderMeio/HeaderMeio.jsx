import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagens/LOGO PRETA.png';

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
        console.log(token + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapora");
        if (token != null) {
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
            if (json.status != false) {
                setUser(json);
                console.log(user);
                setLogado(true);
            }else{
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
                return (
                    <ul class="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="/Login">
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                                Login
                                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="/Cadastro">
                                <i className="fas fa-user-plus mr-2"></i>
                                            Cadastro
                        </Link>
                        </li>
                    </ul>
                )
            } else {
                return (
                    <ul class="nav">
                        
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="/Carrinho">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                            Carrinho
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark-brown" to="" onClick={logout}>
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                                Logout
                            </Link>
                        </li>
                    </ul>
                )
            }
        } else {
            return (
                <ul class="nav">
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
    
        return (
            <div className="header-middle py-4 bg-middle-brown">
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
                                        <input type="text" className="form-control" />
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
    
        async function logout(){
            var response;
            if (token != null) {
                try {
                    response = await fetch("https://anorosa.com.br/Emporio037/api/logout?token=" + token, {method:'POST'});
                } catch (error) {
                    
                }
                var json = response.json();
                if(json.status === true){
                    localStorage.removeItem("JWTAuth");
                    setToken("");
                    alert(json.message);
                }
            }
            
        }
    
}
