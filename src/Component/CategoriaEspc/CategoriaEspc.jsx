import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderMeio from '../Header/HeaderMeio/HeaderMeio';
import './CategoriaEspc.css';

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
export default function CategoriaEspec(props) {//Este é um hook, ele retorna algo a ser lido no site. Mesma coisa que um componente, mas com o código um pouco mais compacto

    //Criação das constantes e seus estados
    const { id } = props.match.params; //Pegando um valor que foi mandado pela url
    const [prod, setProd] = useState(null); //Objeto produto
    const [estado, setEstado] = useState(false);//bool que indica se a api já foi consultada
    const [nulo, setNulo] = useState(true);//bool que indica se o resultado da api foi != null
    const [countconexao, setCountconexao] = useState(0);
    const [erro, setErro] = useState(null);
    const [status, setstatus] = useState(null);
    const [Paginate, setPaginate] = useState(15);
    const [Promocao, setPromocao] = useState(0);
    const [Volume, setVolume] = useState(0);
    const [Order, setOrder] = useState(0);
    const [Paginas, setPaginas] = useState(true);
    
    
    
    
    

    

    async function conexao() {
        var response;
        const categ = props.match.params;
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate='+Paginate+'&promocao='+Promocao+'&volume='+Volume+'&orderby='+Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data != null) {
            setProd(json.data);
            setNulo(false);
            setstatus(200);
            setPaginas(json.last_page);
            console.log(json.last_page);
        };

        setEstado(true);
    };
    async function BuscaCon(qde) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate='+qde+'&promocao='+Promocao+'&volume='+Volume+'&orderby='+Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data != null) {
            setProd(json.data);
            setNulo(false);
            setstatus(200);
            console.log(json.data);
            console.log(Paginate);
        };

        setEstado(true);
    };
    async function BuscaDesconto(desc) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate='+Paginate+'&promocao='+desc+'&volume='+Volume+'&orderby='+Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data != null) {
            setProd(json.data);
            setNulo(false);
            setstatus(200);
            console.log(json);
            console.log(Paginate);
        };

        setEstado(true);
    };
    const handleInputDisconto =event=>{
        const target = event.target;
        const value = target.value;
        console.log(value);
        BuscaDesconto(value);
    }
    async function BuscaVolume(vol) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate='+Paginate+'&promocao='+Promocao+'&volume='+vol+'&orderby='+Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data != null) {
            setProd(json.data);
            setNulo(false);
            setstatus(200);
            console.log(json.data);
        };

        setEstado(true);
    };
    const handleInputVolume =event=>{
        const target = event.target;
        const value = target.value;
        console.log(value);
        BuscaVolume(value);
    }

    useEffect(() => {
        setEstado(false);
        setNulo(true);
        conexao();
    }, [id]);

    if (estado === true) {
        if (nulo === false) {
            if (status === 200) {
                var ProdCod = prod.map((item, indice) => {
                    return (
                        <div key={indice} className="col-sm-6 col-lg-4">
                            <div className="product-wrapper bg-white mb-3 shadow-sm">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-auto px-3">
                                        <div className="product-img-wrapper">
                                            <img src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} alt="" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="product-info">
                                            <h3 className="h6 my-3">{item.nomeprod}</h3>
                                            {desconto(item.preco, item.desconto)}
                                        </div>
                                        <Link to={'/Produto/' + item.id} className="btn btn-primary mb-3">Ver mais</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                );
            }
            return (
                <div className="container">
                    <h1 className="page-title">
                        <span>Vodkas</span>
                    </h1>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <div className="row justify-content-end ">
                                <div className="col-lg-9">
                                    <div className="row align-items-center">
                                        <div className="col-sm mb-2 text-left">
                                            <span>100 Resultados</span>
                                        </div>
                                        <div className="col-auto mb-2">
                                            <label for="num_products">Exibir</label>
                                            <select  onChange={event=>
                                            { const target = event.target;
                                                const value = target.value;
                                                setPaginate(value);
                                                BuscaCon(value);                                                
                                            }} name="quantiProd" className="order-products" id="num_products">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option selected="selected" value="15">15</option>
                                                <option value="20">20</option>

                                            </select>
                                        </div>
                                        <div className="col-auto mb-2 ">
                                            <label for="order">Ordenar por</label>
                                            <select className="order-products" id="order">
                                                <option value="">Menor preço</option>
                                                <option value="">Maior preço</option>
                                                <option value="">Nome</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-4 mb-lg-0 order-first order-lg-0">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded p-3 pt-lg-4 pb-lg-5">
                                <a className="navbar-brand d-lg-none" href="#">Filtros</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#filter-groups-container" aria-controls="filter-groups-container" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse mt-3 mt-lg-0" id="filter-groups-container">
                                    <ul className="navbar-nav mr-auto flex-column">
                                        <li className="nav-item">
                                            <div className="filter-group mb-3">
                                                <h3 className="filter-title h5 text-dark-brown">Desconto</h3>
                                                <div className="filter-options-container">
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input onChange={handleInputDisconto} value="1" type="radio" id="desc10" name="desconto" className="custom-control-input" />
                                                        <label className="custom-control-label" for="desc10">Até 10% OFF</label>
                                                    </div>
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input onChange={handleInputDisconto} value="2" type="radio" id="desc20" name="desconto" className="custom-control-input" />
                                                        <label className="custom-control-label" for="desc20">Até 20% OFF</label>
                                                    </div>
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input onChange={handleInputDisconto} value="3" type="radio" id="desc20more" name="desconto" className="custom-control-input" />
                                                        <label className="custom-control-label" for="desc20more">Mais de 20% OFF</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="filter-group">
                                                <h3 className="filter-title h5 text-dark-brown">Volume</h3>
                                                <div className="filter-options-container">
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input value="1" onChange={handleInputVolume} type="radio" id="vol600" name="volume" className="custom-control-input" />
                                                        <label className="custom-control-label" for="vol600">Até 600 ml</label>
                                                    </div>
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input value="2" onChange={handleInputVolume} type="radio" id="vol1000" name="volume" className="custom-control-input" />
                                                        <label className="custom-control-label" for="vol1000">Até 1 L</label>
                                                    </div>
                                                    <div className="custom-control custom-radio filter-option">
                                                        <input value="3" onChange={handleInputVolume} type="radio" id="vol1000more" name="volume" className="custom-control-input" />
                                                        <label className="custom-control-label" for="vol1000more">Mais de 1 L</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                        <div className="col-lg-9 mb-4">
                            <div className="form-row">
                                {ProdCod}
                            </div>
                        </div>
                        <div className="col-12 mb-5">
                            <div className="row justify-content-end">
                                <div className="col-lg-9">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Próxima</a>
                                            </li>
                                            <li  className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item "><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">Anterior</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {

            return <div>
                <a>Nenhum produto cadastrado nesta categoria :c</a>
            </div>
        }
    } else {

        return (
            <div>
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }


}