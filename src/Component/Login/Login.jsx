import React, { Component } from 'react';
import './Login.css';
import { Link,Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        "email":"",
        "password":""
        },
        redirect: false
    }
  }


  htmlLogin() {

    return (
      <div>
        <form>
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
              <input  type="checkbox" className="form-check-input" id="exampleCheck1"></input>
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
    fetch("https://anorosa.com.br/Emporio037/api/login", {
      method: "post",
      body: JSON.stringify(this.state.data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
          console.log(this.state.data);
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
  };
  render() {
    const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
    return (
      <div>
        {this.htmlLogin()}
      </div>
    );}
  }
}

export default Login;





