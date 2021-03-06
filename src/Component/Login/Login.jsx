import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom";
import logo from '../../imagens/LOGO BRANCA.png';
import background from '../../imagens/background.jpg';
import { data } from 'jquery';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "email": "",
        "password": "",
      },
      redirect: false,
      lembrar: false,
      erro: null,
      loading: false,
    }
  }
  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          
        </div>
      );
    }
  }

  htmlLogin() {
    return (
      <div className="row no-gutters" id="content">
          <div className="container-logo col-md-4">
            <Link to="/">
                <img src={logo} class="mx-md-auto mb-md-5" alt="" id="logo"/>
            </Link>
            <div className="d-md-block" id="welcome">
                <h2>Bem vindo!</h2>
                <p>Para continuar comprando,<br/> por favor faça login na sua conta</p>
            </div>
        </div>
        <div className="col bg-light p-md-0" id="form-login" style={{backgroundImage: 'url('+ background +')'}}>
            <div className="col-sm-10 col-lg-8 col-xl-6">
                
                    {this.loginform()}
                
            </div>
        </div>
      </div>
    );
  }
  loginform(){
    if(this.state.loading === false){
      return(
        <form onSubmit={this.handleSubmit} class="px-sm-5 pb-sm-5">
              <Link className="d-block mb-3" to="/">
                        <i className="fas fa-long-arrow-alt-left mr-2"></i>
                          Voltar
                    </Link>
                    <div className="form-group">
                        <label for="email" >Email</label>
                        <input type="email" id="email" onChange={this.handleInputChange} className="form-control" name="email" required />
                    </div>
                    <div className="form-group">
                        <label for="password" >Senha</label>
                        <input name="password" type="password" id="password" onChange={this.handleInputChange} className="form-control mb-2" required />
                        <div className="custom-control custom-checkbox">
                            <input onChange={()=>{
                              if(!this.state.lembrar){
                                this.setState({lembrar:true})
                                console.log(this.state.lembrar);
                              }else {
                                this.setState({lembrar:false})
                                console.log(this.state.lembrar);
                              }
                            }} type="checkbox" name="keepMe" className="custom-control-input" id="keepMe" />
                            <label  className="custom-control-label" for="keepMe">Mantenha-me conectado</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-success">Logar</button>
                    <div className="or">
                        <span>OU</span>
                    </div>
                    <Link className="btn btn-block btn-outline-primary" to="/Cadastro">
                          Cadastre-se
                    </Link>
                  </form>
      )
    }else{
      return(
        <form onSubmit={null} class="px-sm-5 pb-sm-5">
        <div className="text-center loading">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
          </div>
      </form>
      )
      
    }
  }
  handleSubmit = event => {
    this.setState({loading: true});
    console.log(this.state.lembrar);
    if(this.state.lembrar === true){
    fetch("https://anorosa.com.br/Emporio037/api/remember", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async token =>{
        this.setState({loading: false});
        if(token.ok){
        var json = await token.json();
        if(json.authenticated === false){

          window.confirm('Credenciais inválidas');
          
        }else{
          localStorage.setItem("JWT_token",json.data.access_token);
          this.setState({ redirect: true });
          window.location.reload('http://localhost:3000/');
        }
        }else{
          window.confirm('Erro no banco de dados');
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));
    }else if(!this.state.lembrar){
      fetch("https://anorosa.com.br/Emporio037/api/login", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async token =>{
      this.setState({loading: false});
      if(token.ok){
      var json = await token.json();
      if(json.authenticated === false){
        window.confirm('Credenciais inválidas');
      }else{
        localStorage.setItem("JWT_token",json.data.access_token);
        this.setState({ redirect: true });
        window.location.reload('http://localhost:3000/');
      }
      }else{
        window.confirm('Erro no banco de dados :C');
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error});
          }
        });
      }
    })
      .catch(erro => this.setState({ erro: erro }));

    }
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
          {  this.htmlLogin()}
        </div>
      );
    }
  }
}

export default Login;





