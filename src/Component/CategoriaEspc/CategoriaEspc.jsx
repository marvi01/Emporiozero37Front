import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    //const [nulo, setNulo] = useState(true);//bool que indica se o resultado da api foi != null
    //const [countconexao, setCountconexao] = useState(0);
    const [/*erro*/, setErro] = useState(null);
    const [status, setstatus] = useState(null);
    const [Paginate, setPaginate] = useState(15);
    const [Promocao, /*setPromocao*/] = useState(0);
    const [Volume, /*setVolume*/] = useState(0);
    const [Order, setOrder] = useState(0);
    const [Paginas, setPaginas] = useState(true);
    const [Next, setNext] = useState(true);
    const [Prev, setPrev] = useState(true);
    const [Total, setTotal] = useState(true);
    const [Categoria, setCategoria] = useState(true);
    const [StatusCateg, setStatusCateg] = useState(true);





    async function conexao() {
        var response;
        var response2;
        const categ = props.match.params;
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + Paginate + '&promocao=' + Promocao + '&volume=' + Volume + '&orderby=' + Order)
            response2 = await fetch('https://anorosa.com.br/Emporio037/api/categoria/' + categ.id)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        const json2 = await response2.json();
        console.log(json2);
        if (json2.status===true) {
            setCategoria(json2.data);
            console.log(categ);
            console.log(json2);
            setStatusCateg(200);

            if (json.data !== null) {
                console.log(json2);
                console.log(json2);
                setProd(json.data);
                //setNulo(false);
                setstatus(200);
                setPaginas(json.last_page);
                setNext(json.next_page_url);
                setPrev(json.prev_page_url);
                setTotal(json.total);
            } else if (json.status === false) {
                setstatus(403);
                setTotal(0);
            };
        }else if(!json2.status){
            setStatusCateg(403)
            console.log(json2);
        }


    };
    async function BuscaCon(qde) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + qde + '&promocao=' + Promocao + '&volume=' + Volume + '&orderby=' + Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== null) {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            setPaginas(json.last_page)
            setNext(json.next_page_url);
            setPrev(json.prev_page_url);
            console.log(json.prev_page_url);
            setTotal(json.total);
        } else if (json.status === false) {
            setstatus(403);
            setTotal(0);
        }


    };
    async function BuscaDesconto(desc) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + Paginate + '&promocao=' + desc + '&volume=' + Volume + '&orderby=' + Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== null) {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            setTotal(json.total);
            console.log(json.total);
            console.log(Paginate);
        } else if (json.status === false) {
            setstatus(403);
            setTotal(0);
        };


    };
    const handleInputDisconto = event => {
        const target = event.target;
        const value = target.value;
        console.log(value);
        setstatus(true);
        BuscaDesconto(value);
    }
    async function BuscaVolume(vol) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + Paginate + '&promocao=' + Promocao + '&volume=' + vol + '&orderby=' + Order)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.status !== false) {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            setTotal(json.total);
            console.log(json);
        } else if (json.status === false) {
            setstatus(403);
            setTotal(0);
        };


    };
    async function BuscaOrder(ord) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + Paginate + '&promocao=' + Promocao + '&volume=' + Volume + '&orderby=' + ord)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== "Nenhum produto encontrado") {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            console.log(json);
        } else if (json.status === false) {
            setstatus(403);
            setTotal(0);
        };


    };
    const handleInputVolume = event => {
        const target = event.target;
        const value = target.value;
        console.log(value);
        setstatus(true);
        BuscaVolume(value);
    }
    async function nextPage(url) {
        var response;
        //const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch(url)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== "Nenhum produto encontrado") {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            setPrev(json.prev_page_url);
            console.log(json);
        } else if (json.status === false) {
            setTotal(0);
            setstatus(403);
        };


    };
    async function EspecPage(page) {
        var response;
        const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/categ=' + categ.id + '&paginate=' + Paginate + '&promocao=' + Promocao + '&volume=' + Volume + '&orderby=' + Order + '?page=' + page)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== "Nenhum produto encontrado") {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            setPrev(json.prev_page_url);
            console.log(json);
        } else if (json.status === false) {
            setstatus(403);
        };


    };
    async function prevPage(url) {
        var response;
        //const categ = props.match.params;
        console.log(Paginate);
        try {
            response = await fetch(url)
        } catch (error) {
            setErro(error);
        }
        const json = await response.json();
        if (json.data !== "Nenhum produto encontrado") {
            setProd(json.data);
            //setNulo(false);
            setstatus(200);
            console.log(url);
        } else if (json.status === false) {
            setstatus(403);
        };


    };
    useEffect(() => {
        //setNulo(true);
        conexao();
    }, [id]);
    const numPage = () => {
        let array = [];
        for (var i = 1; i <= Paginas; i++) {
            array.push(i);
        }
        const numeros = array.map((item, indice) => (
            <div key={indice}>
                <li className="page-item "><p className="page-link" onClick={() => {
                    setstatus(true);
                    EspecPage(item);
                }}>{item}</p></li>
            </div>
        ))
        return numeros
    }
    const produto = () => {
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
            )
        } else if (status === 403) {
            return <div>
                <p>Nenhum produto cadastrado nesta categoria :c</p>
            </div>
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
        return ProdCod;
    }
    if (StatusCateg === 200) {
        return (
            <div className="container">
                <h1 className="page-title">
                    <span>{Categoria.nomecategoria}</span>
                </h1>
                <div className="row">
                    <div className="col-12 mb-2">
                        <div className="row justify-content-end ">
                            <div className="col-lg-9">
                                <div className="row align-items-center">
                                    <div className="col-sm mb-2 text-left">
                                        <span>{Total} Resultados</span>
                                    </div>
                                    <div className="col-auto mb-2">
                                        <label for="num_products">Exibir</label>
                                        <select onChange={event => {
                                            const target = event.target;
                                            const value = target.value;
                                            setPaginate(value);
                                            setstatus(true);
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
                                        <select onChange={event => {
                                            const target = event.target;
                                            const value = target.value;
                                            setOrder(value);
                                            setstatus(true);
                                            BuscaOrder(value);
                                        }} className="order-products" id="order">
                                            <option value="1">Menor preço</option>
                                            <option value="2">Maior preço</option>
                                            <option value="3">Nome</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4 mb-lg-0 order-first order-lg-0">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded p-3 pt-lg-4 pb-lg-5">
                            <span className="navbar-brand d-lg-none">Filtros</span>
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
                            {produto()}
                        </div>
                    </div>
                    <div className="col-12 mb-5">
                        <div className="row justify-content-end">
                            <div className="col-lg-9">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item =">
                                            <p className="page-link" onClick={() => {if(Prev!==null) setstatus(true); prevPage(Prev) }}>Anterior</p>
                                        </li>
                                        {numPage()}
                                        <li className="page-item">
                                            <p className="page-link" onClick={() => { if(Next!==null) setstatus(true); nextPage(Next) }} >Próxima</p>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (StatusCateg === 403) {
        return (<div>
            <p>Categoria não encontrada :c</p>
        </div>)
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
