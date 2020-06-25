import React, { Component } from 'react';
import './Contatos.css';
import insta from '../../imagens/instagram.png'

class header extends Component {





    render() {
        return (
            <div className="Contato">

                <a  href="https://www.instagram.com/emporiozero37/?hl=pt-br"><img className="instagram" src={insta} alt=""/></a>
            </div>
        );
    }
}

export default header;