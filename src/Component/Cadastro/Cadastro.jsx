import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "nome": "Marcos",
                "type": 1,
                "telefone": "999983843",
                "endereco": "Manoel Rodruiges 32",
                "nasc": "2002-02-07",//Data de Nascimento 
                "email": "marcos@gmail.com",
                "email_verified_at": null,
                "created_at": "",
                "updated_at": ""
            },
            status: true,
            erro: null,
            redirect: false
        }
    }

    ExibiCadastro() {
        //ESCREVA O HTML AQUI 
        const htmlCadastro = (
            <div>
                <form onSubmit={this.handleSubmit}> 
                    Cadastro
                <button type="submit"> Botao Cadastro </button>
                </form>
                
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
                    {this.ExibiCadastro()}
                </div>
            );
        }
    }
}

export default Cadastro;