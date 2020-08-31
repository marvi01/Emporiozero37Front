import React, { Component } from 'react'; //Importa o método componente e react
import '../UserProfile.css';//Importa css


class UserAddress extends Component {

    render() {//Aqui acontece a renderização da página
        return (
            <div>
               <div className="user-page-title">
                    <h1 className="h2 mb-0">Cadastrar endereço</h1>
                    <p className="mb-5 mb-sm-3">A sua localização será carregada durante o processo de compra</p>
                </div>
                <div className="container">
                    <form action="" method="POST">
                        <div className="row no-gutters justify-content-center">
                            <div className="col-lg-8 px-sm-5 profile-form">
                                <a href="arquivo3.html" className="prev-button">
                                    <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                    Voltar
                                </a>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label for="cep">CEP</label>
                                        <input type="text" className="form-control mb-2" id="cep"/>
                                        <a href="" target="_blank">Não sei meu CEP</a>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm">
                                        <label for="estado">Estado</label>
                                        <input type="text" className="form-control" id="estado" readonly />
                                    </div>
                                    <div className="form-group col-sm">
                                        <label for="cidade">Cidade</label>
                                        <input type="text" className="form-control" id="cidade" readonly />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm-6">
                                        <label for="bairro">Bairro</label>
                                        <input type="text" className="form-control" id="bairro" />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm-8">
                                        <label for="rua">Rua</label>
                                        <input type="text" className="form-control" id="rua" />
                                    </div>
                                    <div className="form-group col mb-5">
                                        <label for="numero">Número</label>
                                        <input type="text" className="form-control" id="numero" />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-6 col-md-3">
                                        <button className="btn btn-block btn-lg btn-outline-secondary">
                                            Cancelar
                                        </button>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <button type="submit" className="btn btn-block btn-lg btn-primary">
                                            Salvar 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>            
            </div>
        );
    }
}
export default UserAddress; //Aqui retorna o componente