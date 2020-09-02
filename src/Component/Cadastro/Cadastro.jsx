import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from '../../imagens/LOGO BRANCA.png';
import background from '../../imagens/background.jpg';
import Carousel from 'react-bootstrap/Carousel';
import './Cadastro.css';
import { $, mask } from 'jquery';

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: null,
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
            telefoneerror: '',
            nomeerror:'',
            dataerror:'',
            confirmSenha:null,
            senhaerror:null,
            confirmError:null
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
    confirmSenha = event=>{
        const target = event.target;
        const value = target.value;
        this.setState({confirmSenha:value})

    }
    //Validações de input
    inputTelefone = (input) => {
        this.input = input;
    };
    teste = () => {
        let numero = `${this.input.value}`;
        let numeroMask = `${this.input.value}`;
        numeroMask = numero.replace(/\(|\)|-/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');
        this.setState(prevState => ({
            data: { ...prevState.data, telefone: numero }
        }));
        this.setState({ tel: numeroMask })
    }

    ExibiCadastro() {
        //ESCREVA O HTML AQUI 
        const htmlCadastro = (
            <div className="container-fluid center-flex" id="content-cad" style={{ backgroundImage: 'url(' + background + ')' }}>
                <div className="row justify-content-center no-gutters">
                    <div className="col-sm-10 col-lg-6 col-xl-4 bg-light">
                        <form  >
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
                                            <span className="errorspan">{this.state.nomeerror}</span>
                                        </div>
                                        <span class="btn btn-primary text-white float-right mb-4" onClick={() => {
                                            if(this.state.data.nome.length >= 3 && this.state.data.nome.length <= 44 ){
                                            this.toggleCarousel('next');} else{
                                                this.setState({nomeerror:'Nome invalido'});
                                            }
                                        }}>
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
                                            <span className="errorspan">{this.state.dataerror}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">DDD+Telefone</label>
                                            <input value={this.state.tel} onChange={this.teste} ref={this.inputTelefone} id="telefone" placeholder="98998989898" name="telefone" className="form-control" type="text" pattern="[0-9]{11}" required />
                                            <span className="errorspan">{this.state.telefoneerror}</span>
                                        </div>
                                        <span class="btn btn-primary float-right text-white" onClick={() => {
                                            const date = new Date(this.state.data.nasc);
                                            const dateAtual = new Date();
                                            let ano = dateAtual.getFullYear()- date.getFullYear();
                                            let mes =dateAtual.getMonth()- date.getMonth();
                                            if((ano ===18 && mes>0 || (ano ===18 && mes === 0 && dateAtual.getDate() >= date.getDate()))||ano>18  ){
                                                this.setState({dataerror:null})
                                            if(this.state.data.telefone.length === 11  ){
                                                this.toggleCarousel('next')
                                                this.setState({telefoneerror:''})
                                            }else{
                                                this.setState({telefoneerror:'Telefone invalido! Veja se digitou todos os numeros corretamente'})
                                            }
                                        } else{
                                                this.setState({dataerror:'Você não tem idade ainda para isso'})
                                            }
                                        }}>
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
                                                <span className="errorspan">{this.state.senhaerror}</span>
                                            </div>
                                            <div className="form-group col-lg">
                                                <label htmlFor="confirmarSenha" >Confirmar senha</label>
                                                <input onChange={this.confirmSenha}  type="password" id="confirmarSenha" className="form-control" required minLength="5" maxLength="45" />
                                                <span className="errorspan">{this.state.confirmError}</span>
                                            </div>
                                        </div>
                                        <button onClick={()=>{
                                            const senha = this.state.data.password;
                                            const confirma= this.state.confirmSenha;
                                            if(senha.length >= 6){
                                                this.setState({senhaerror:null})
                                                if(senha===confirma){
                                                    
                                                    this.setState({confirmError:null})
                                                    this.handleSubmit();
                                                }else{
                                                    console.log(senha);
                                                    console.log(confirma);
                                                    this.setState({confirmError:'As senhas não são iguais'})
                                                }
                                            }else{
                                                this.setState({senhaerror:'Senha invalida!'})
                                            }
                                        }} type="submit" class="btn btn-success float-right text-white">
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
            .then(data => {
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