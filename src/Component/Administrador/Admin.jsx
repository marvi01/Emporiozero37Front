import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={

            admin:false
        }
    }
    
    componentDidMount() {
        const token = localStorage.getItem("JWT_token");
        if (token != null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
            };
            fetch("https://anorosa.com.br/Emporio037/api/me", requestOptions)
            .then(data => data.json().then(data => {
                this.setState({admin:data.type});
                console.log(this.state.admin);
            }))
            .catch(erro => this.setState(erro))
        }
    }
    administrador = () => {
        const admin =this.state.admin;
        if(admin ===1){
            return (
                <div className="list-group" id="list-tab" role="tablist">
                    <i className="list-group-item  bg-header text-dark-brown" id="list-home-list">Administrador</i>
                    <Link to="/Admin/Produto" className="list-group-item list-group-item-action" id="list-home-list" role="tab" aria-controls="home"  >Produtos</Link>
                    <Link to="/Admin/Categoria" className="list-group-item list-group-item-action" id="list-profile-list" href="#list-profile" role="tab" aria-controls="profile" >Categorias</Link>
                    <Link to="/Admin/Destaque" className="list-group-item list-group-item-action" id="list-messages-list" href="#list-messages" role="tab" aria-controls="messages" >Destaques</Link>
                    <Link to="/Admin/Carrossel" className="list-group-item list-group-item-action" id="list-settings-list" href="#list-settings" role="tab" aria-controls="settings" >Carrossel</Link>
        
                </div>
            );

        }else if(admin===0){
            return(
                <div>
                    <Redirect to="/"/>
                </div>
            )

        }else if(!admin){
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
        }
    }

    render() {
        return(
            <div>
                {this.administrador()}
            </div>
        )
    }
}

export default Admin;