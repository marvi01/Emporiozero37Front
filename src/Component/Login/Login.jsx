import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom";
import logo from '../../imagens/LOGO BRANCA.png';
import background from '../../imagens/background.jpg';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "email": "",
        "password": "",
      },
      redirect: false,
      lembrar: "off",
      erro: null,
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
          <div className="col-md-4 bg-dark text-light center-flex py-3">
            <img src={logo} class="mx-md-auto mb-md-5" alt="" id="logo"/>
            <div className="d-md-block" id="welcome">
                <h2>Bem vindo!</h2>
                <p>Para continuar comprando,<br/> por favor faça login na sua conta</p>
            </div>
        </div>
        <div className="col bg-light p-md-0" id="form-login" style={{backgroundImage: 'url('+ background +')'}}>
            <div className="col-sm-10 col-lg-8 col-xl-6">
                <form action="" class="px-sm-5 pb-sm-5">
                    <a href="" className="d-block mb-3">
                        <i className="fas fa-long-arrow-alt-left mr-2"></i>
                        Voltar
                    </a>
                    <div className="form-group">
                        <label for="email" >Email</label>
                        <input type="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="password" >Senha</label>
                        <input type="password" id="password" className="form-control mb-2" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" for="customCheck1">Mantenha-me conectado</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-success">Logar</button>
                    <div className="or">
                        <span>OU</span>
                    </div>
                    <a href="#" className="btn btn-block btn-outline-primary">Cadastre-se</a>
                </form>
            </div>
        </div>
      </div>
    );
  }
  handleSubmit = event => {
    fetch("https://anorosa.com.br/Emporio037/api/remember", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
            this.setState({ redirect: true });
            return data.json();

        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      }).then(token =>{ 

        console.log(token.access_token)
        console.log(token)
        localStorage.setItem("JWT_token",token.access_token);
        window.location.reload('http://localhost:3000/')
        
      })
      .catch(erro => this.setState({ erro: erro }));
    event.preventDefault();
  };
  handleInputCheck = event => {
    if (this.state.lembrar == "off") {
      const target = event.target;
      const name = target.name;
      let value = target.value;
      this.setState({ lembrar: value });
      console.log(this.state.lembrar)
    } else {
      this.setState({ lembrar: "off" });
      console.log(this.state.lembrar)
    }

  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      data: { ...prevState.data, [name]: value }
    }));
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      console.log(this.state.erro)
      return (
        <div>
          {  this.htmlLogin()}
        </div>
      );
    }
  }
}

export default Login;





