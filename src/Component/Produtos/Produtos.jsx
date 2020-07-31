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
                                                <img src={vodka} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="product-info">
                                                <h3 class="h6 my-3">Exercitation ex sit veniam commodo incididunt occaecat amet.</h3>
                                                <div className="price mb-3">
                                                    <div className="old-price">
                                                        60,00
                                    <span class="badge badge-success ml-2">20% OFF</span>
                                                    </div>
                                                    <span class="h4">R$ 50,00
                                </span>
                                                </div>
                                            </div>
                                            <a href="#" class="btn btn-primary mb-3">Ver mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    });
                    
                    /*const carouselHTML = Prod.map((item, index) =>{
                        

                       
                        var a = 0;
                        var b = 0;
                        if(Prod.length > 1 && dupli2 === 0){
                        dupli2 = 1;
                        var c = Prod.length/4;
                            console.log(item);
                            console.log(index);
                            console.log(b + "   aaaaaaaaaaaaaaaaaaaaaaaa " + Prod.length)
                            b++;
                            return(
                                <Carousel.Item key={b}>
                                <div className="form-row">
                                    {Prod[b*4-4]}
                                    {Prod[b*4-3]}
                                    {Prod[b*4-2]}
                                    {Prod[b*4-1]}
                                </div>
                            </Carousel.Item>
                            )
                        }
                    });*/
                    if(Prod.length > 1 && dupli2 === 0){
                        const a = carousel(Prod);
                        return (
                            <Carousel>
                                {a}
                            </Carousel>
                        );
                    }
                    return null;
                    
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
function carousel(Prod){
    var b;
    for(var i = 0; i < Prod.length+2;i+4 ){
        
       const a = ()=>{
           return(
            <Carousel.Item key={i}>
                                <div className="form-row">
                                    {Prod[i]}
                                    {Prod[i+1]}
                                    {Prod[i+2]}
                                    {Prod[i+3]}
                                </div>
            </Carousel.Item>)
        };
        
    }
    return b;
}