import React, { Component } from 'react';
import './Contatos.css';
import insta from '../../imagens/instagram.png'

class header extends Component {





    render() {
        return (
            <div>
                <div className="Contato">
                    <div className="tam ">
                        <a className="seguir " href="https://www.instagram.com/emporiozero37/?hl=pt-br">
                            <img className="instagram " src={insta} alt="" />
                            Nos sigam
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}

export default header;