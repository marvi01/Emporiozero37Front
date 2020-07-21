import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="layout">

            <div className="form-group">
              <h3 align="center">Logar</h3>
              <label for="exampleInputEmail1">Email </label>
              <input onChange={this.handleInputChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>

            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input onChange={this.handleInputChange} name="password" type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="form-group form-check ">
              <input onChange={this.handleInputCheck} type="checkbox" className="form-check-input" id="exampleCheck1"></input>
              <div className="">
                <label className="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
                <p><Link to="/Cadastro" className="form-check-label texto">Cadastre-se </Link></p>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success">Submit</button>

          </fieldset>
        </form>
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





