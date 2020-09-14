import React, { Component } from 'react'; //Importa o método componente e react
import '../UserProfile.css';//Importa css
import { Link, Redirect } from 'react-router-dom';


class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "nome": "",
                "email": "",
                "type": "",
                "telefone": "",
                "nasc": ""
            },
            userUpdates: {

            },
            status: 200,
            isApiRequested: false,
            telefoneerror: null,
            dataerror: null,
            nomeerror: null
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('JWT_token');
        fetch("https://anorosa.com.br/Emporio037/api/me", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
        }).then(data => data.json().then(data => {
            if (data.status !== false) {
                this.setState({ user: data, isApiRequested: true });
            } else {
                alert("Favor realizar o login novamente");
                this.props.history.goBack();
            }
        }))
            .catch(erro => this.setState(erro));
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            userUpdates: { ...prevState.userUpdates, [name]: value }
        }));
    };
    handleSubmit = () => {
        if (this.state.user.telefone === this.state.userUpdates.telefone) {
            delete this.state.userUpdates.telefone;
        }
        const token = localStorage.getItem("JWT_token")
        fetch("http://anorosa.com.br/Emporio037/api/usuario/update/" + this.state.user.id, {
            method: "put",
            body: JSON.stringify(this.state.userUpdates),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(data => data.json().then(data => {
                if (data.status) {
                    this.props.history.goBack();
                } else {
                    alert(data.error);
                }
            })).catch(erro => this.setState({ erro: erro }));
    };

    render() {//Aqui acontece a renderização da página
        const isApiRequested = this.state.isApiRequested;
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Dados pessoais</h1>
                    <p>Edite as suas informações pessoais</p>
                </div>
                <div className="container pb-5">
                    <div className="row no-gutters justify-content-center">
                        <div className="col-md-10 col-lg-6 px-sm-5 profile-form">
                            <Link to="/Perfil" className="prev-button">
                                <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                    Voltar
                                </Link>
                            <div className="form-group">
                                <label for="nome">Nome completo</label>
                                {isApiRequested
                                    ? <input onChange={this.handleInputChange} type="text" className="form-control mb-2" name="nome" id="nome" defaultValue={this.state.user.nome} />
                                    : <input disabled readonly type="text" className="form-control mb-2" />
                                }

                                <span className="errorspan">{this.state.nomeerror}</span>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label for="celular">Celular</label>
                                    {isApiRequested
                                        ? <input onChange={this.handleInputChange} defaultValue={this.state.user.telefone} name="telefone" type="text" className="form-control" id="celular" />
                                        : <input disabled readonly type="text" className="form-control" />
                                    }
                                    <span className="errorspan">{this.state.telefoneerror}</span>
                                </div>
                                <div className="form-group col-sm-6 mb-5">
                                    <label for="nascimento">Nascimento</label>
                                    {isApiRequested
                                        ? <input onChange={this.handleInputChange} defaultValue={this.state.user.nasc} type="date" name="nasc" className="form-control" id="nascimento" />
                                        : <input disabled readonly type="date" className="form-control" />
                                    }
                                    <span className="errorspan">{this.state.dataerror}</span>
                                </div>
                            </div>
                            <button onClick={() => {
                                if (this.inputValidation()) {
                                    this.handleSubmit()
                                }
                            }} className="btn btn-block btn-lg btn-primary">
                                Salvar alterações
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    inputValidation() {
        var updates = this.state.userUpdates;
        var isValid = true;
        if (updates.nome) {
            if (updates.nome.length >= 3 && updates.nome.length <= 44) {
                this.setState({ nomeerror: null });
                isValid = false;
            } else {
                this.setState({ nomeerror: 'Nome invalido!' });
            }
        }
        if (updates.telefone) {
            if (updates.telefone.length === 11) {
                this.setState({ telefoneerror: null })
                
            } else {
                this.setState({ telefoneerror: 'Telefone invalido!' })
                isValid = false;
            }
        }
        if (updates.nasc) {


            const date = new Date(updates.user.nasc);
            const dateAtual = new Date();
            let ano = dateAtual.getFullYear() - date.getFullYear();
            let mes = dateAtual.getMonth() - date.getMonth();
            if ((ano === 18 && mes > 0 || (ano === 18 && mes === 0 && dateAtual.getDate() >= date.getDate())) || ano > 18) {
                this.setState({ dataerror: null })

            } else {
                this.setState({ dataerror: 'Data invalida!' })
                isValid = false;
            }
        }
        return isValid;
    }
}
export default UpdateUserInfo; //Aqui retorna o componente