import React, { Component } from 'react'; //Importa o método componente e react
import '../UserProfile.css';//Importa css


class UpdateUserPassword extends Component {

    render() {//Aqui acontece a renderização da página
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Senha da conta</h1>
                    <p>Edite a senha usada para iniciar sessão</p>
                </div>
                <div className="container pb-5">
                    <form action="" method="POST">
                        <div className="row no-gutters justify-content-center">
                            <div className="col-md-10 col-lg-6 px-sm-5 profile-form">
                                <a href="arquivo3.html" className="prev-button">
                                    <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                    Voltar
                                </a>
                                <div className="form-group">
                                    <label for="old_password">Senha atual</label>
                                    <input type="password" className="form-control" id="old_password" />
                                </div>
                                <div className="form-row align-items-end">
                                    <div className="form-group col">
                                        <label for="new_password">Nova senha</label>
                                        <input type="password" className="form-control" id="new_password" />
                                    </div>
                                    <div className="form-group col-sm order-last order-sm-0">
                                        <label for="confirm_password">Confirmar senha</label>
                                        <input type="password" className="form-control" id="confirm_password" />
                                    </div>
                                    <div className="form-group col-auto">
                                        <button className="btn btn-outline-primary" type="button" id="show_password">
                                            <i className="fas fa-eye show_icon"></i>
                                            <i className="fas fa-eye-slash hide_icon"></i>
                                            <span className="sr-only">Mostrar a senha</span>
                                        </button>
                                    </div>
                                </div>
                                <h2 className="h5 mb-1">Lembre-se</h2>
                                <ul className="list-unstyled small mb-5">
                                    <li>A senha deve ter letras, números e caracteres especiais</li>
                                    <li>A senha deve ter no mínimo 6 caracteres</li>
                                    <li>Não utilize o seu nome ou números consecutivos</li>
                                </ul>
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Salvar senha</button>
                            </div>
                        </div>
                    </form>
                </div>       
            </div>
        );
    }
}
export default UpdateUserPassword; //Aqui retorna o componente