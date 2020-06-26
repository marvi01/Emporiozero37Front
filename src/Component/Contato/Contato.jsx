import React, { Component } from 'react';
import './Contatos.css';
import insta from '../../imagens/instagram.png';
import cel from '../../imagens/telefone.png';

class header extends Component {





    render() {
        return (
            <div>
                <div className="Contato ">
                    <div className="tam ">
                        <a className=" " href="https://www.instagram.com/emporiozero37/?hl=pt-br">
                            <img className="instagram " src={insta} alt="" />
                        </a>
                        <div className ="direita">
                            <div >
                                <a>
                                    <img className="telefone" src={cel}></img>(37)99999-9999
                                </a>
                            </div>
                            <div>
                                <a>
                                    <img className="telefone" src={cel}></img>(37)99999-9999
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default header;