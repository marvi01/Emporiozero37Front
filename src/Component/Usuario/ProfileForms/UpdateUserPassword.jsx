import React, { Component } from 'react'; //Importa o método componente e react
import '../UserProfile.css';//Importa css
import './AdressForm.css';
import { Link } from 'react-router-dom';


class UpdateUserPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: {
                oldpassword: null,
                newpassword: null,
                rpnewpassword: null,
            },
            inputErrors: {
                oldpassword: null,
                newpassword: null,
                rpnewpassword: null,
            },
            isPasswordHidden: true,
            status: 200

        }
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState(prevState => ({
            password: { ...prevState.password, [name]: value }
        }));
    };

    handleSubmit = () => {
        
        this.setState({
            inputErrors: {
                oldpassword: null,
                newpassword: null,
                rpnewpassword: null,
            },
        })
        if (this.state.password.newpassword !== this.state.password.rpnewpassword) {
            this.state.setState(prevState => ({
                inputErrors: { ...prevState.inputErrors, rpnewpassword: "As senhas não batem" }
            }))
        } else {
            var json = {
                "password": this.state.password.oldpassword,
                "newpassword": this.state.password.newpassword
            };
            const token = localStorage.getItem("JWT_token");
            fetch("http://anorosa.com.br/Emporio037/api/usuario/changepw", {
                method: "post",
                body: JSON.stringify(json),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(data => data.json().then(data => {
                    if (data.errorcode) {
                        switch (data.errorcode) {
                            case 1:
                                this.setState({ inputErrors: { newpassword: data.error } });
                                break;
                            case 3:
                                alert("Erro interno");
                                break;
                            case 7:
                                this.setState({ inputErrors: { oldpassword: data.error } });
                                break;
                            default:
                                alert(data.erro)
                                break;
                        }
                    } else {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            this.props.history.goBack();
                        }
                    }
                })).catch(erro => this.setState({ erro: erro }));
        }
    };
    render() {//Aqui acontece a renderização da página
        var inputErrors = this.state.inputErrors;
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Senha da conta</h1>
                    <p>Edite a senha usada para iniciar sessão</p>
                </div>
                <div className="container pb-5">
                    <div>
                        <div className="row no-gutters justify-content-center">
                            <div className="col-md-10 col-lg-6 px-sm-5 profile-form">
                                <Link to="/Perfil" className="prev-button">
                                    <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                    Voltar
                                </Link>
                                <div className="form-group">
                                    <label for="old_password">Senha atual</label>
                                    <input onChange={this.handleInputChange} type="password" className="form-control" name="oldpassword" id="oldpassword" />
                                    {inputErrors.oldpassword
                                        ? <div><span className="errorSpan">{inputErrors.oldpassword}</span> <br /></div>
                                        : null
                                    }
                                </div>
                                <div className="form-row align-items-end">
                                    <div className="form-group col">
                                        <label for="new_password">Nova senha</label>
                                        <input onChange={this.handleInputChange} type={this.state.isPasswordHidden ?"password" :"text"} className="form-control" name="newpassword" id="newpassword" />
                                        {inputErrors.newpassword
                                            ? <div><span className="errorSpan">{inputErrors.newpassword}</span> <br /></div>
                                            : null
                                        }
                                    </div>
                                    <div className="form-group col-sm order-last order-sm-0">
                                        <label for="confirm_password">Confirmar senha</label>
                                        <input onChange={this.handleInputChange} type="password" className="form-control" name="rpnewpassword" id="rpnewpassword" />
                                        {inputErrors.rpnewpassword
                                            ? <div><span className="errorSpan">{inputErrors.rpnewpassword}</span> <br /></div>
                                            : null
                                        }
                                    </div>
                                    <div className="form-group col-auto">
                                        <button onClick={()=>this.setState({isPasswordHidden : !this.state.isPasswordHidden})} className="btn btn-outline-primary" type="button" id="show_password">
                                            {this.state.isPasswordHidden
                                                ? <i className="fas fa-eye show_icon"></i>
                                                : <i className="fas fa-eye-slash show_icon"></i>
                                            }
                                            <span className="sr-only">Mostrar a senha</span>
                                        </button>
                                    </div>
                                </div>
                                <h2 className="h5 mb-1">Lembre-se</h2>
                                <ul className="list-unstyled small mb-5">
                                    <li>Uma senha forte deve ter letras, números e caracteres especiais</li>
                                    <li>A senha deve ter no mínimo 6 caracteres</li>
                                    <li>Não utilize o seu nome ou números consecutivos</li>
                                </ul>
                                <button onClick={() => {
                                            this.handleSubmit()
                                        }} className="btn btn-primary btn-block btn-lg">Salvar senha</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UpdateUserPassword; //Aqui retorna o componente