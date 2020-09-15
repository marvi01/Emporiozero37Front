import React, { Component } from 'react'; //Importa o método componente e react
import './UserProfile.css';//Importa css
import AddressNotFound from '../../imagens/address.jpg';
import { Link } from 'react-router-dom';
import AdressList from './AdressList';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "nome": "",
                "email": "",
                "type": "",
                "telefone": "",
                "nasc": ""
            },
            status: 200
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('JWT_token');
        fetch("https://anorosa.com.br/Emporio037/api/me", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
        }).then(data => data.json().then(data => {
            this.setState({ user: data });
        }))
            .catch(erro => this.setState(erro));
    }
   
maskTelefone =(numero)=>{
    let numeroMask = numero.replace(/\(|\)|-/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');     
    return numeroMask;
}

    render() {//Aqui acontece a renderização da página
        //O metodo return define o que vai ser renderizado no site
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Meu perfil</h1>
                    <p className="mb-5 mb-sm-3">Edite os dados da conta, os seus dados pessoais e endereços de entrega</p>
                </div>
                <div className="container">
                    <div className="row no-gutters justify-content-center">
                        <div className="col-lg-10">
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-key"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Dados da conta</h2>
                                            <p className="mb-sm-0">Edite as suas credenciais para autenticação</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Email</h3>
                                                </div>
                                                <div className="col">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <span>{this.state.user.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Senha</h3>
                                                </div>
                                                <div className="col">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <span>*******</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link to="/Perfil/Senha/Editar">Editar<i className="ml-2 fas fa-long-arrow-alt-right"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Dados pessoais</h2>
                                            <p className="mb-sm-0">Edite as suas informações pessoais</p>
                                        </div>
                                        <div className="col-sm-auto">
                                            <Link to="/Perfil/Editar">Editar <i className="ml-2 fas fa-long-arrow-alt-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Nome</h3>
                                                </div>
                                                <div className="col">
                                                    <span>{this.state.user.nome}</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Nascimento</h3>
                                                </div>
                                                <div className="col">
                                                    <span> <input value={this.state.user.nasc} className="input-clean" type="date" name="" id="" readOnly /> </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Celular</h3>
                                                </div>
                                                <div className="col">
                                                    <span>{this.maskTelefone(this.state.user.telefone)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Endereços de entrega</h2>
                                            <p className="mb-0">Edite as localizações de entrega dos seus pedidos</p>
                                        </div>
                                    </div>
                                </div>
                                <AdressList />
                                <div className="card-footer">
                                    <div className="row no-gutters">
                                        <div className="col-sm-auto">
                                            <Link to={"/Perfil/Enderecos/Cadastrar/"+this.state.user.id} className="btn btn-block btn-primary">
                                                Cadastrar novo endereço
                                            </Link>
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
export default UserProfile; //Aqui retorna o componente