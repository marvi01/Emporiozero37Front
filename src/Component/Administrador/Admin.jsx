import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {

    render() {
        return (
            <div className="list-group" id="list-tab" role="tablist">
                <i className="list-group-item  bg-header text-middle-brown" id="list-home-list">Administrador</i>
                <Link className="list-group-item list-group-item-action" id="list-home-list" role="tab" aria-controls="home"  >Produtos</Link>
                <Link className="list-group-item list-group-item-action" id="list-profile-list" href="#list-profile" role="tab" aria-controls="profile" >Teste</Link>
                <Link className="list-group-item list-group-item-action" id="list-messages-list" href="#list-messages" role="tab" aria-controls="messages" >Destaques</Link>
                <Link className="list-group-item list-group-item-action" id="list-settings-list" href="#list-settings" role="tab" aria-controls="settings" >Promoções</Link>
            </div>
        );
    }
}

export default Admin;