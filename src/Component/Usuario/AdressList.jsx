import React, { Component } from 'react';
import './UserProfile.css';//Importa css
import AddressNotFound from '../../imagens/address.jpg';
import { Link } from 'react-router-dom';

class AdressList extends Component {
    constructor(props) {
        super(props);
        const id = props;
        this.state = {
            id: id.id,
            endereco: null,
            loading: true
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('JWT_token');
        fetch("https://anorosa.com.br/Emporio037/api/me&adress", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
        }).then(data => data.json().then(data => {
            console.log(data);
           this.setState({ endereco: data.adress, status: 200, loading:false });
        }))
            .catch(erro => this.setState(erro));
    }

    maskCEP = (numero) => {
        let numeroMask = numero.substring(0, 5) + "-" + numero.substring(5)
        return numeroMask;
    }

    listEnd = () => {
        const endereco = this.state.endereco;
        console.log(endereco);
        if (endereco !==  null && endereco.length !== 0) {
            const htmlEnd = endereco.map((item, indice) => (
                <li key={indice} className="list-group-item">
                    <div className="form-row flex-nowrap align-items-center">
                        <div className="col">
                            <address>
                                <strong> {item.rua}, {item.numero}</strong><br />
                                {item.bairro}<br />
                                {item.cidade}, {item.uf} {this.maskCEP(item.cep)}<br />
                                {item.complemento}
                            </address>
                        </div>
                        <div className="col-auto">
                            <div className="dropdown dropleft">
                                <button className="btn-reset dropdown-toggle" type="button" data-toggle="dropdown">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={"/Perfil/Enderecos/Editar/" + item.id}  >Editar</Link>
                                    <a className="dropdown-item" onClick={() => {
                                        const token = localStorage.getItem('JWT_token');
                                        fetch("https://anorosa.com.br/Emporio037/api/delendereco/" + item.id, {
                                            method: 'delete',
                                            headers: { 'Authorization': 'Bearer ' + token },
                                        }).then(data => data.json().then(data => {
                                                if(data.status){
                                                    var array = [this.state.endereco];
                                                    array.splice(indice, 1);
                                                    this.setState({
                                                        endereco: array 
                                                    });
                                                }
                                        }))
                                    }}>Deletar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))
            return htmlEnd
        } else if (this.state.loading) {
            return (
                <div>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="address-not-found">
                    <div className="row no-gutters justify-content-center">
                        <div className="col-md-4">
                            <img src={AddressNotFound} className="img-fluid" alt="Endereços de entrega não encontrados" />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-md-8 col-lg-6">
                            <h3>Nenhum endereço cadastrado</h3>
                            <p>Por favor, cadastre ao menos uma localização para que a gente possa carregar essas informações durante a compra.</p>
                        </div>
                    </div>
                </div>
            )
        }

    }
    render() {
        return (

            <div className="card-body p-0">
                <ul className="list-group list-group-flush">

                    {this.listEnd()}
                </ul>
                {/* CASO NÃO HAJA ENDEREÇOS CADASTRADOS, EXIBIR ESSE CONTEÚDO

                                    

                                    */}
            </div>
        );
    }
}

export default AdressList;