import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagens/LOGO PRETA.png';

class HeaderMeio extends Component {
    /*  ------------------------ A LISTAGEM DAS CATEGORIAS ACONTECE EM HEADER INFERIOR, AGORA
    constructor(props) {
        super(props);
        this.state = {
            nulo: true,
            estado: false,
            categ: [{
                "id": 0,
                "nomecategoria": "",
                "created_at": "",
                "updated_at": ""
            }],
            status: false,
        };
    };
    async componentDidMount() {
        var response;
        try {
            response = await fetch("https://anorosa.com.br/Emporio037/api/categoria/list");

        } catch (error) {
            console.log(error);
            this.setState({ error })
        }
        const json = await response.json();
        console.log('===================' + json)
        if (json != null) {
            this.setState({ categ: json, nulo: false });
        }
        this.setState({ estado: true });
    }
    exibeListarCategoria() {
        const { erro } = this.state;
        const { categ } = this.state.categ;
        if (erro) {

        } else {
            if (this.state.estado === true) {
                if (this.state.nulo === false) {
                    const CatCod = categ.map((item, indice) => {
                        return (
                            <div className='botaomenu' key={indice}>
                            <li className="nav-item active" >
                                
                                <a className="nav-link" href={`/Categoria/${item.id}`}>
                                    {item.nomecategoria}
                                </a>
                               
                                
                            </li>
                            </div>
                        )
                    })
                    return CatCod;
                }

            }
        }
    }
    */
    render() {
        return (
            <div className="header-middle py-4 bg-middle-brown">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4 col-lg-2">
                            <Link to="/">
                                <img src={logo} alt="Emporio 037" className="img-fluid" />
                            </Link>
                        </div>
                        <div className="col">
                            <div className="row justify-content-end">
                                <div className="col-lg-6">
                                    <ul class="nav">
                                        <li class="nav-item">
                                            <a class="nav-link text-dark-brown" href="#">
                                                <i class="fas fa-sign-in-alt mr-2"></i>
                                                Login
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-dark-brown" href="#">
                                                <i class="fas fa-user-plus mr-2"></i>
                                                Cadastro
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="input-group shadow-sm">
                                        <input type="text" className="form-control" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeaderMeio;