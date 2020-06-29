import React, { Component } from 'react';
import './MenuSuperior.css';
import { Link } from 'react-router-dom';
import logo from '../../imagens/Logo.png';
import login from '../../imagens/login.png'
import carrinho from '../../imagens/carrinho.png';

class MenuSuperior extends Component {
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
                            <div class='botaomenu' key={indice}>
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
    render() {
        return (
            <div className="navigator">
                <div className=" headerpadrao ">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} placeholder="logo" />
                        </Link>
                    </div>
                    <div className="  input-group busca">
                        <input type="text" className="buscatam" placeholder="Pesquise um produto" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark" type="button">Pesquisar</button>
                        </div>
                    </div>
                    <div className="comboFig ">
                        <Link to="/Carrinho" ><img alt='some value' className="figuras " src={carrinho} /></Link>
                        <Link to="/Login" ><img alt='some value' className="figuras " src={login} /></Link>
                    </div>
                </div>
                <div className='menucateg'>
                    <div className='centro'>
                        <nav className="celular navbar navbar-expand-lg navbar-light">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto a">
                                    <li className="pc nav-item active">
                                        <Link className="nav-link" to="/Login">Entrar</Link>
                                    </li>
                                    <li className="pc nav-item active">
                                        <Link className="nav-link" to="/Carrinho">Carrinho</Link>
                                    </li>
                                    {this.exibeListarCategoria()}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default MenuSuperior;