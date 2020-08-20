import React, { Component } from 'react'; //Importa o método componente e react
import './Sections.css';
import '../Produtos/Produtos.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

var duplicado;

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "id": 0,
                "nomeprod": "",
                "descricao": "",
                "desconto": 0,
                "destaque": 0,
                "foto": "",
                "preco": 0,
                "teor": 0,
                "ml": 0,
                "quantidade": 0,
                "categoria_id": 0,
                "created_at": "",
                "updated_at": ""
            }],

            erro: null,
            nulo: true,
            estado: false,
            status: false
        };
    };
    async componentDidMount() {
        var response;

            try {
                response = await fetch(`https://anorosa.com.br/Emporio037/api/produto/list/promocao`);
            } catch (error) {
                console.log(error);
                this.setState({ error })
            }
            const json = await response.json();

            if (json.error === null || json.error === undefined ) {
                this.setState({ data: json.data, nulo: false });
                console.log(json);
            }
            this.setState({ estado: true });
        }
    
    exibirProd() {
        if (this.state.erro !== null) {

        } else {
            if (this.state.estado === true) {
                if (this.state.nulo === false) {
                    const Prod = this.state.data.map((item, indice) => {
                        return (

                            <div key={indice} className="col-sm-6 col-xl-3">
                                <div className="product-wrapper bg-white shadow-sm">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col-auto px-3">
                                            <div className="product-img-wrapper">
                                                <img src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="product-info">
                                                <h3 className="h6 my-3">{item.nomeprod}</h3>

                                                {desconto(item.preco, item.desconto)}
                                            </div>
                                            <Link to={`/Produto/${item.id}`}  className="btn btn-primary mb-3">Ver mais</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    });

                    const carouselHTML = Prod.map((item, indice) => {

                        if (Prod.length / 4 > indice) {
                            return (
                                <Carousel.Item key={indice}>
                                    <div className="form-row">
                                        {Prod[indice * 4]}
                                        {Prod[indice * 4 + 1]}
                                        {Prod[indice * 4 + 2]}
                                        {Prod[indice * 4 + 3]}
                                    </div>
                                </Carousel.Item>
                            )
                        }


                    });

                    return (
                        <Carousel interval={1000000000}>
                            {
                                carouselHTML
                            }
                        </Carousel>
                    );



                } else {
                    return (
                        <p>Nenhum produto nesta sessão :c</p>
                    )
                }
            }
        }
    }



    render() {//Aqui acontece a renderização da página
        
        return (
            <section className="section">
                    <div className="section-header mb-3">
                        <h2 className="h4 section-title d-inline">Promoções</h2>
                        <a href="" className="ml-2">Ver tudo</a>
                    </div>
                    <div className="section-body">
                    {this.exibirProd()}
                    </div>
            </section>
            
        );
    }
}
export default Section; //Aqui retorna o componente
function desconto(preco, desconto) {
    if (desconto !== 0) {
        var valoratual = preco - preco * parseFloat(desconto) / 100;
        return (<div className="price mb-3">
            <div className="old-price">
                R${parseFloat(preco).toFixed(2).replace(".", ",")}
                <span className="badge badge-success ml-2">{desconto}%</span>
            </div>
            <span className="h4">R${parseFloat(valoratual).toFixed(2).replace(".", ",")}
            </span>
        </div>)
    } else {
        return (
            <div className="price mb-3">
                <div className="old-price">

                    <span className="badge badge-success ml-2"></span>
                </div>
                <span className="h4">R${parseFloat(preco).toFixed(2).replace(".", ",")}</span>
            </div>
        )
    }
}