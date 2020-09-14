import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserAddressEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            token: localStorage.getItem("JWT_token"),
            endereco: {
                "user_id": 0,
                "cep": "",
                "uf": "",
                "cidade": "",
                "bairro": "",
                "rua": "",
                "numero": "",
                "complemento": ""
            }
        }
    }
    
    componentDidMount(){
        const id = this.props.match.params;
        console.log(id);
        fetch("https://anorosa.com.br/Emporio037/api/showendereco/"+id.id,{
            headers:{
                "Authorization": "Bearer "+this.state.token 
            }
        }).then(data => data.json().then(data=>{
            this.setState({endereco:data.data})
        }))
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState(prevState => ({
            endereco: { ...prevState.endereco, [name]: value }
        }));
        console.log(this.state.endereco);
    };
    handleSubmit = () => {
        fetch("http://anorosa.com.br/Emporio037/api/endereco/update/id="+this.state.endereco.id+"&&userid="+this.state.endereco.user_id, {
            method: "put",
            body: JSON.stringify(this.state.endereco),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('Adionado com sucesso')
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            }).catch(erro => this.setState({ erro: erro }));
    };

    render() {//Aqui acontece a renderização da página
        console.log(this.state.endereco);       
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Editar endereço</h1>
                    <p className="mb-5 mb-sm-3">A sua localização será carregada durante o processo de compra</p>
                </div>
                <div className="container">
                        <div className="row no-gutters justify-content-center">
                            <div className="col-lg-8 px-sm-5 profile-form">
                                <Link to="/Perfil" className="prev-button">
                                    <i className="fas fa-long-arrow-alt-left mr-2"></i>
                                    Voltar
                                </Link>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label for="cep">CEP</label>
                                        <input defaultValue={this.state.endereco.cep} onChange={this.handleInputChange} type="text" className="form-control mb-2" id="cep" />
                                        <a href="" target="_blank">Não sei meu CEP</a>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm">
                                        <label for="estado">Estado</label>
                                        <select  onChange={this.handleInputChange}  className="form-control" id="uf" readonly >
                                            <option value="">Selecione</option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espirito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm">
                                        <label for="cidade">Cidade</label>
                                        <input defaultValue={this.state.endereco.cidade} onChange={this.handleInputChange} type="text" className="form-control" id="cidade" readonly />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm-7">
                                        <label for="bairro">Bairro</label>
                                        <input defaultValue={this.state.endereco.bairro} onChange={this.handleInputChange} type="text" className="form-control" id="bairro" />
                                    </div>
                                    <div className="form-group col-sm-5">
                                        <label for="bairro">Complemento</label>
                                        <input defaultValue={this.state.endereco.complemento} onChange={this.handleInputChange}  type="text" className="form-control" id="complemento" />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="form-group col-sm-8">
                                        <label for="rua">Rua</label>
                                        <input defaultValue={this.state.endereco.rua} onChange={this.handleInputChange} type="text" className="form-control" id="rua" />
                                    </div>
                                    <div className="form-group col mb-5">
                                        <label for="numero">Número</label>
                                        <input defaultValue={this.state.endereco.numero} onChange={this.handleInputChange} type="text" className="form-control" id="numero" />
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-6 col-md-3">
                                        <button className="btn btn-block btn-lg btn-outline-secondary">
                                            Cancelar
                                        </button>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <button onClick={()=>{
                                            this.handleSubmit()
                                        }
                                        } className="btn btn-block btn-lg btn-primary">
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default UserAddressEdit;