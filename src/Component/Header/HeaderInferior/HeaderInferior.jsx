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
            type: 0,
            status: false,
        };
    };
    async componentDidMount() {
        
        
        var response;
        try {
            response = await fetch("https://anorosa.com.br/Emporio037/api/categoria/list");

        } catch (error) {
            
            this.setState({ error })
        }
        const json = await response.json();
        if (json.data != null) {
            this.setState({ data: json, nulo: false });
        }
        if(localStorage.getItem("JWT_token") !== null){
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("JWT_token") },
            };
            try {
                response = await fetch("https://anorosa.com.br/Emporio037/api/me", requestOptions);
            } catch (error) {

            }
            const json2 = await response.json();
            if (json2.nome !== null) {
                this.setState({ type: json2.type });
                
            } else {
                localStorage.removeItem("JWT_token");
            }
        }
        this.setState({ estado: true });
    }

    exibeListarCategoria() {
        const { erro } = this.state;
        const { data } = this.state.data;
        if (erro) {

        } else {
            if (this.state.estado === true) {
                if (this.state.nulo === false) {
                    const CatCod = data.map((item, indice) => {
                        return (
                            <Link key={indice} to={`/Categoria/${item.id}`} className="dropdown-item text-light pl-4 py-2">{item.nomecategoria}</Link>
                        )
                    })
                    return CatCod;
                }

            }
        }
    }
    admin(){
        if(localStorage.getItem("JWT_token") !== null){
            if(this.state.type !== 0){
            return(
                <li className="nav-item">
                    <Link to="/Admin" className="nav-link">Administração</Link>
                </li>
            );
            }
    }
    }
    render() {//Aqui acontece a renderização da página
        return (
            <div className="header-bottom  bg-dark-brown ">
                <div className="container-md">
                    <nav className="navbar navbar-expand-md navbar-dark">
                        <h2 className="mb-0 navbar-brand text-middle-brown">Emporio</h2>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#categorias">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="categorias">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Inicio</Link>
                                </li>
                                {this.admin()}
                                <li className="nav-item">
                                    <div className="dropdown nav-link">
                                        <button className="btn-reset dropdown-toggle" type="button" id="categorias" data-toggle="dropdown">
                                            Categorias
                                        </button>
                                        <div className="dropdown-menu bg-dark">
                                            <h6 className="dropdown-header">Bebidas</h6>
                                            {this.exibeListarCategoria()}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
export default HeaderInferior; //Aqui retorna o componente