import React, { Component } from 'react'; //Importa o método componente e react
import './HeaderInferior.css';
import { Link } from 'react-router-dom';

class HeaderInferior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nulo: true,
            estado: false,
            data: [{
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
        console.log( json)
        if (json.data != null) {
            this.setState({ data: json, nulo: false });
        }
        this.setState({ estado: true });
    }

    exibeListarCategoria() {
        const { erro } = this.state;
        const { data } = this.state.data;
        console.log( this.state.data)
        if (erro) {

        } else {
            if (this.state.estado === true) {
                if (this.state.nulo === false) {
                    const CatCod = data.map((item, indice) => {
                        return (
                            <li key={indice} className="nav-item active">
                                <Link to={`/Categoria/${item.id}`} className="nav-link" href="#">{item.nomecategoria} <span className="sr-only">(current)</span></Link>
                            </li>
                        )
                    })
                    return CatCod;
                }

            }
        }
    }
    render() {//Aqui acontece a renderização da página
        return (
            <div className="header-bottom  bg-dark-brown ">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <a className="navbar-brand text-middle-brown" href="#">Emporio</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#categorias">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div classNameName="collapse navbar-collapse" id="categorias">
                            <ul className="navbar-nav">
                                {this.exibeListarCategoria()}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
export default HeaderInferior; //Aqui retorna o componente