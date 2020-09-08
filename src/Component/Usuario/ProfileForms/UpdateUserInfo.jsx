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
            status: 200,
            telefoneerror: null,
            dataerror: null,
            nomeerror: null
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('JWT_token');
        console.log(token);
        fetch("https://anorosa.com.br/Emporio037/api/me", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
        }).then(data => data.json().then(data => {
            console.log(data);
            this.setState({ user: data });
        }))
            .catch(erro => this.setState(erro));
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
        console.log(this.state.user);
    };
    handleSubmit = (json) => {
        const token = localStorage.getItem("JWT_token")
        console.log(token);
        fetch("http://anorosa.com.br/Emporio037/api/usuario/update/"+this.state.user.id, {
            method: "put",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('Atualizado com sucesso')
                    return(
                        <Redirect to="/"/>
                    )
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            }).catch(erro => this.setState({ erro: erro }));
    };

    render() {//Aqui acontece a renderização da página
        console.log(this.state);
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
                                <input onChange={this.handleInputChange} type="text" className="form-control mb-2" name="nome" id="nome" defaultValue={this.state.user.nome} />
                                <span className="errorspan">{this.state.nomeerror}</span>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label for="celular">Celular</label>
                                    <input onChange={this.handleInputChange} defaultValue={this.state.user.telefone} name="telefone" type="text" className="form-control" id="celular" />
                                    <span className="errorspan">{this.state.telefoneerror}</span>
                                </div>
                                <div className="form-group col-sm-6 mb-5">
                                    <label for="nascimento">Nascimento</label>
                                    <input onChange={this.handleInputChange} defaultValue={this.state.user.nasc} type="date" name="nasc" className="form-control" id="nascimento" />
                                    <span className="errorspan">{this.state.dataerror}</span>
                                </div>
                            </div>
                            <button onClick={() => {
                                if (this.state.user.nome.length >= 3 && this.state.user.nome.length <= 44) {
                                    this.setState({ nomeerror: null });

                                } else {
                                    this.setState({ nomeerror: 'Nome invalido!' });
                                }
                                if (this.state.user.telefone.length === 11) {
                                    this.setState({ telefoneerror: null })
                                } else {
                                    this.setState({ telefoneerror: 'Telefone invalido!' })
                                }
                                const date = new Date(this.state.user.nasc);
                                const dateAtual = new Date();
                                let ano = dateAtual.getFullYear() - date.getFullYear();
                                let mes = dateAtual.getMonth() - date.getMonth();
                                if ((ano === 18 && mes > 0 || (ano === 18 && mes === 0 && dateAtual.getDate() >= date.getDate())) || ano > 18) {
                                    this.setState({ dataerror: null })

                                } else {
                                    this.setState({ dataerror: 'Data invalida!' })
                                }
                                if(this.state.dataerror === null && this.state.nomeerror===null&& this.state.telefoneerror===null){
                                    let UserUpdate ={
                                        nome: this.state.user.nome,
                                        telefone: this.state.user.telefone,
                                        nasc:this.state.user.nasc
                                    }
                                    this.handleSubmit(UserUpdate)
                                    console.log("Tudo correto ");
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
}
export default UpdateUserInfo; //Aqui retorna o componente