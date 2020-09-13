import React, { Component } from 'react'; //Importa o método componente e react
import './Categorias.css';//Importa css

import { Link } from 'react-router-dom';


class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "nomecategoria": "",
                "img":""
            },
            "status": false
        }
    }

    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ data: data.data })
                this.setState({ status: data.status })
            }))
            .catch(erro => this.setState(erro));

    }

    htmlCateg = () => {
        const categorias = this.state.data;
        const status = this.state.status;
        if (status) {
            const exibiCateg = categorias.map((item, indice) => (
            <div className="col-6 col-sm-auto">
                <a href="">
                    <div className="categoria">
                        <img className="img-categoria" src={'https://anorosa.com.br/Emporio037/storage/' +item.img} />
                        <h3 className="h6">{item.nomecategoria}</h3>
                    </div>
                </a>
            </div>
            ))
            return exibiCateg
        }
    }
    render() {//Aqui acontece a renderização da página
        return (
            <section className="categorias mb-5">
                {console.log(this.state.data)}
                <h2 className="mb-3 h4">Categorias</h2>
                <div className="form-row">
                {this.htmlCateg()}
                    <div className="col-sm-auto">
                        <a href="">
                            <div className="show-more flex-md-column justify-content-md-center">
                                <i className="fas fa-angle-right mb-md-2 order-md-0"></i>
                                <h3 className="h6 ">Ver todas</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}
export default Categorias; //Aqui retorna o componente