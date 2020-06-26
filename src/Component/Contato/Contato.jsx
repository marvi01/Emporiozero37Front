import React, { Component } from 'react';
import './Contatos.css';
import insta from '../../imagens/instagram.png';
import cell from '../../imagens/telefone.png';

class header extends Component {





    render() {
        return (
            <div>
                <div className="header">
                    <div className="tam">
                        <div className="socialm">
                        
                           <ul>
                               <li>
                                    <a  href="https://www.instagram.com/emporiozero37/?hl=pt-br">
                                        <img className="icone icones" src={insta} alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <p>Siga-nos</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tel"> 
                            <div className="iconetel">
                                <a> <img className="icone " src={cell} alt="Contato" /> </a>
                            </div>
                            <div className="tels">
                                <ul>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=5537988317271&text=Ol%C3%A1!%20Estou%20sendo%20redirecionado%20de%20um%20site%20para%20o%20whatsapp!!">(37) 999989999</a>
                                        
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=5537988317271&text=Ol%C3%A1!%20Estou%20sendo%20redirecionado%20de%20um%20site%20para%20o%20whatsapp!!">(37) 999989999</a>
                                    </li>
                                </ul>
                            </div>
                                 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default header;