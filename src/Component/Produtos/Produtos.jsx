import React, { Component } from 'react'; //Importa o método componente e react
import './Produtos.css';//Importa css
import vodka from "../../imagens/vodka2.png"
import Carousel from 'react-bootstrap/Carousel';

var duplicado = 0;
var dupli2 = 0;
class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rtype: 0,
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
        var _url;

        if (duplicado === 0) {
            if (this.props.rtype === 0) {
                _url = "produto/list";
                duplicado = 1;
            } else {
                if (this.props.rtype === 1) {
                    _url = "produto/list/destaque";
                    duplicado = 1;
                } else {
                    if (this.props.rtype === 2) {
                        _url = "produto/list/promocao";
                        duplicado = 1;
                    } else {
                        duplicado = 1;
                    }
                }
            }
            try {
                response = await fetch(`https://anorosa.com.br/Emporio037/api/${_url}`);
            } catch (error) {
                console.log(error);
                this.setState({ error })
            }
            const json = await response.json();

            if (json != null) {
                this.setState({ data: json.data, nulo: false });
                console.log(_url);
                console.log(json);
            }
            this.setState({ estado: true });
        }
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
                                                <img src={vodka} alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="product-info">
                                                <h3 class="h6 my-3">{item.nomeprod}</h3>

                                                {desconto(item.preco, item.desconto)}
                                            </div>
                                            <a href="#" class="btn btn-primary mb-3">Ver mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    });

                    const carouselHTML = Prod.map((item, indice) => {

                        if (Prod.length / 4 > indice) {
                            return (
                                <Carousel.Item>
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
                        <Carousel interval={1000000000} fade="true">
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
            <div>
                {this.exibirProd()}
            </div>
        );
    }
}
export default Produto; //Aqui retorna o componente
function desconto(preco, desconto) {
    if (desconto !== 0) {
        var valoratual = preco - preco * parseFloat(desconto) / 100;
        return (<div className="price mb-3">
            <div className="old-price">
                R${parseFloat(preco).toFixed(2).replace(".", ",")}
                <span class="badge badge-success ml-2">{desconto}%</span>
            </div>
            <span class="h4">R${parseFloat(valoratual).toFixed(2).replace(".", ",")}
            </span>
        </div>)
    } else {
        return (
            <div className="price mb-3">
                <div className="old-price">

                    <span class="badge badge-success ml-2"></span>
                </div>
                <span class="h4">R${parseFloat(preco).toFixed(2).replace(".", ",")}</span>
            </div>
        )
    }
}