import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from '../../imagens/LOGO BRANCA.png';
import background from '../../imagens/background.jpg';
import Carousel from 'react-bootstrap/Carousel';
import './Cadastro.css';
import {$,mask} from 'jquery';

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "nome": "",
                "type": 0,
                "telefone": "",
                "nasc": "",
                "email": "",
                "password": "",
                "email_verified_at": null
            },
            status: true,
            erro: null,
            redirect: false,
            index: 0,
            direction: null,
            carouselItemCount: 3,
            telefoneerror: ''
        }
    }

    toggleCarousel = (direction) => {
        let index = this.state.index
        const [min, max] = [0, this.state.carouselItemCount - 1]

        if (direction === 'next') {
            if (index < max) {
                index++
            }
        }
        else if (direction === 'prev') {
            if (index > min) {
                index--
            }
        }
        this.setState({
            direction,
            index
        })
    }
    
    //Validações de input
    isValidPhone=event=>{
    $("#telefone").mask("(00) 0000-00009");
    }
    ExibiCadastro() {
        //ESCREVA O HTML AQUI 
        const htmlCadastro = (
            <div className="container-fluid center-flex" id="content-cad" style={{ backgroundImage: 'url(' + background + ')' }}>
                <div className="row justify-content-center no-gutters">
                    <div className="col-sm-10 col-lg-6 col-xl-4 bg-light">
                        <form onSubmit={this.handleSubmit} >
                            <Carousel length={3}
                                controls={false}
                                interval={null}
                                indicators={false}
                                activeIndex={this.state.index}
                                direction={this.state.direction}
                            >
                                <Carousel.Item>
                                    <div class="carousel-body">
                                        <h1 className="form-heading">
                                            Cadastro
                                        </h1>
                                        <hr />
                                        <h2 className="h5 text-gray">Olá!</h2>
                                        <p>Primeiro, nos diga como devemos te chamar</p>
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome</label>
                                            <input onChange={this.handleInputChange} id="nome" name="nome" className="form-control form-control-lg" type="text" required minLength="3" maxLength="45" />
                                        </div>
                                        <span class="btn btn-primary text-white float-right mb-4" onClick={() => this.toggleCarousel('next')}>
                                            Próximo
                                        </span>
                                        <div className="clearfix"></div>
                                        <p className="text-center mb-0">Já possui uma conta? <Link to="/Login">Realizar login</Link></p>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="carousel-body">
                                        <div class="form-title">
                                            <h1 className="form-heading">
                                                Cadastro
                                            </h1>
                                            <span className="link-active" onClick={() => this.toggleCarousel('prev')}>
                                                <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                            Anterior
                                            </span>
                                        </div>
                                        <hr />
                                        <h2 className="h5 text-gray">Prazer, {this.state.data.nome}!</h2>
                                        <p>Quando voce nasceu e qual seu número de telefone?</p>
                                        <div className="form-group">
                                            <label htmlFor="nascimento">Nascimento</label>
                                            <input onChange={this.handleInputChange} id="nascimento" name="nasc" className="form-control" type="date" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Telefone</label>
                                            <input onkeypress={"$(this).mask('(00) 0000-00009')"} id="telefone" placeholder="98998989898" name="telefone" className="form-control"   type="text" pattern="[0-9]{11}" />
                                            <span className="errorspan">{this.state.telefoneerror}</span>
                                        </div>
                                        <span class="btn btn-primary float-right text-white" onClick={() => this.toggleCarousel('next')}>
                                            Próximo
                                        </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="carousel-body">
                                        <div className="form-title">
                                            <h1 className="form-heading">
                                                Cadastro
                                            </h1>
                                            <span className="link-active" onClick={() => this.toggleCarousel('prev')}>
                                                <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                            Anterior
                                            </span>
                                        </div>
                                        <hr />
                                        <h2 className="h5 text-gray">Estamos quase lá!</h2>
                                        <p>Por último, nos informe o email e senha que voce usará para fazer login</p>
                                        <div className="form-group">
                                            <label htmlFor="email" >Email</label>
                                            <input onChange={this.handleInputChange} type="email" id="email" name="email" className="form-control" required />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg">
                                                <label htmlFor="senha" >Senha</label>
                                                <input onChange={this.handleInputChange} type="password" id="senha" name="password" className="form-control" required minLength="5" maxLength="45" />
                                            </div>
                                            <div className="form-group col-lg">
                                                <label htmlFor="confirmarSenha" >Confirmar senha</label>
                                                <input type="password" id="confirmarSenha" className="form-control" required minLength="5" maxLength="45" />
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-success float-right text-white">
                                            Finalizar cadastro
                                        </button>
                                        <div className="clearfix"></div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </form>
                    </div>
                    <div className="container-logo order-lg-last col-sm-10 col-lg-4 col-xl-3">
                        <Link to="/">
                            <img src={logo} class="mx-md-auto" alt="" id="logo-cad" />
                        </Link>
                    </div>
                </div>
            </div>
        )
        return htmlCadastro;
    }
    handleSubmit = event => {
         fetch("https://anorosa.com.br/Emporio037/api/usuario/add", {
            method: "post",
            body: JSON.stringify(this.state.data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then( data => {
                if (data.ok) {
                     fetch("https://anorosa.com.br/Emporio037/api/login", {
                        method: "post",
                        body: JSON.stringify(this.state.data),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(async token => {
                        this.setState({ loading: false });
                        if (token.ok) {
                            var json = await token.json();
                            if (json.authenticated === false) {
                                window.confirm('Credenciais inválidas');
                            } else {
                                localStorage.setItem("JWT_token", json.data.access_token);
                                this.setState({ redirect: true });
                                window.location.reload('http://localhost:3000/');
                            }
                        } else {
                            window.confirm('Erro no banco de dados :C');
                            data.json().then(data => {
                                if (data.error) {
                                    this.setState({ erro: data.error });
                                }
                            });
                        }
                    })
                        .catch(erro => this.setState({ erro: erro }));
                    this.setState({ redirect: true });
                    console.log(JSON.stringify(data));
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
        event.preventDefault();
    };
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            data: { ...prevState.data, [name]: value }
        }));
        console.log(this.state.data);
    };


    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <div>
                    {this.ExibiCadastro()}
                </div>
            );
        }
    }
}

export default Cadastro;