import React, { Component } from 'react'; //Importa o método componente e react
import './VerificarIdade.css';//Importa css
import logo from '../../imagens/LOGO BRANCA.png';
import bgModal from '../../imagens/modal-background.png';
class VerificarIdade extends Component {
    render() {//Aqui acontece a renderização da página
        return (
            <div>
                <div className="modal fade" id="verify_age" data-backdrop="static" data-keyboard="false" tabindex="-1">
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content">
                            <div className="modal-body bg-light text-dark p-0 rounded">
                                <div className="modal-logo" style={{ backgroundImage: `url(${bgModal})`}}>
                                    <img src={logo} className="modal-logo-img" alt="" />
                                </div>
                                <div className="modal-text p-sm-5">
                                    <h1 className="mb-0 ">Olá</h1>
                                    <p className="h4 mb-4">Voce tem 18 anos ou mais?</p>
                                    <div className="form-row">
                                        <div className="col-sm">
                                            <button className="btn btn-outline-secondary btn-lg btn-block mb-3 mb-md-0">
                                                Não, sair
                                            </button>
                                        </div>
                                        <div className="col-sm">
                                            <button className="btn btn-primary btn-block btn-lg">
                                                Sim, continuar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default VerificarIdade; //Aqui retorna o componente