import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EnderecoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endereco: {
                "user_id": 0,
                "cep": "",
                "uf": "",
                "cidade": "",
                "bairro": "",
                "rua": "",
                "numero": "",
                "complemento": ""
            },
            status: false
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('JWT_token');
            fetch("https://anorosa.com.br/Emporio037/api/endereco/list", {
                headers: { 'Authorization': 'Bearer ' + token },
            }).then(data => data.json().then(endereco => {
                console.log(endereco);
                this.setState({ endereco: endereco });
                this.setState({ status: 200 })

            }))
                .catch(erro => this.setState(erro));
    }
    enderecoList = () => {
        const end = this.state.endereco;
        const status = this.state.status
        if (status === 200) {
            const htmlEnd = end.map((item, indice) => {
                return (
                    <div key={indice} className="custom-checkbox-control">
                        <input type="radio" className="custom-checkbox-input" id="address1" name="address" />
                        <label for="address1" className="custom-checkbox-label">
                            <div className="row no-gutters custom-checkbox-label-content">
                                {/* ICONE */}
                                <div className="col-auto custom-checkbox-label-icon">
                                    <div className="custom-checkbox-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>
                                {/* TEXTO */}
                                <div className="col custom-checkbox-label-text">
                                    <div className="adress-container">
                                        <address>{item.rua}, {item.numero}<br />{item.cidade} {item.uf} {item.cep.substring(0, 5) + "-" + item.cep.substring(5)}<br />{item.complemento}
                                        </address>
                                        <Link to={"/Perfil/Enderecos/Editar/"+item.id}>Editar</Link>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                )
            })
            return htmlEnd;

        } else if (!status) {

        } else {
            return (
                <div>
                    Load
                </div>
            )
        }

    }
    render() {
        return (
            <div>
                {this.enderecoList()}
            </div>
        );
    }
}

export default EnderecoList;