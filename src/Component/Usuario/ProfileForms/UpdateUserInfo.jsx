import React, { Component } from 'react'; //Importa o método componente e react
import '../UserProfile.css';//Importa css


class UpdateUserInfo extends Component {

    render() {//Aqui acontece a renderização da página
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Dados pessoais</h1>
                    <p>Edite as suas informações pessoais</p>
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
                                    <label for="nome">Nome completo</label>
                                    <input type="text" className="form-control mb-2" id="nome" value="Ryan William Fonseca"/>
                                </div>
                                <div className="form-group">
                                    <label for="cpf">CPF</label>
                                    <input type="text" className="form-control" id="cpf" value="152.674.226-81"/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label for="celular">Celular</label>
                                        <input type="text" className="form-control" id="celular"/>
                                    </div>
                                    <div className="form-group col-sm-6 mb-5">
                                        <label for="nascimento">Nascimento</label>
                                        <input type="date" className="form-control" id="nascimento"/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-block btn-lg btn-primary">
                                    Salvar alterações
                                </button>
                            </div>
                        </div>
                    </form>
                </div>        
            </div>
        );
    }
}
export default UpdateUserInfo; //Aqui retorna o componente