import React, { Component } from 'react';
import './Checkout.css';
import Carousel from 'react-bootstrap/Carousel';
import card_front from '../../imagens/card-front.png';
import card_back from '../../imagens/card-back.png';
import EnderecoList from './EnderecoList';
import DetalheCarrinho from './DetalheCarrinho';
import { Link } from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {

            freteEnv: {
                cepdestino: "",
                peso: "",
                valordeclarado: "",
            },
            confirm: {
                "amount": 0,
                "card_holder_name": "",
                "card_cvv": "",
                "card_number": "",
                "card_expiration_date": "",
                "installments": 0,
                "customer": {
                    "external_id": "",
                    "name": "",
                    "type": "individual",
                    "country": "br",
                    "documents": [],
                    "phone_numbers": [],
                    "email": ""
                },
                "billing": {
                    "name": "Caio",
                    "address": {
                        "country": "br",
                        "street": "Afonso Pena",
                        "street_number": "93",
                        "state": "mg",
                        "city": "Lagoa da Prata",
                        "neighborhood": "Centro",
                        "zipcode": "35590000"
                    }
                },
                "shipping": {
                    "name": "",
                    "fee": 0,
                    "delivery_date": null,
                    "expedited": false,
                    "address": {
                        "country": "br",
                        "street": "Floriano Peixoto",
                        "street_number": "246",
                        "state": "mg",
                        "city": "Formiga",
                        "neighborhood": "Centro",
                        "zipcode": "35570000"
                    }
                },
                "items": []
            },
            "customerOFF": {
                "external_id": "1",
                "name": "Miguel Alves",
                "type": "individual",
                "country": "br",
                "documents": [],
                "phone_numbers": ["+5537988352002"],
                "email": "miguelfernandesalves09@gmail.com"
            },
            "billingOFF": {
                "name": "Caio",
                "address": {
                    "country": "br",
                    "street": "Afonso Pena",
                    "street_number": "93",
                    "state": "mg",
                    "city": "Lagoa da Prata",
                    "neighborhood": "Centro",
                    "zipcode": "35590000"
                }
            },
            "shippingOFF": {
                "name": "",
                "fee": 0,
                "delivery_date": null,
                "expedited": false,
                "address": {
                    "country": "br",
                    "street": "Floriano Peixoto",
                    "street_number": "246",
                    "state": "mg",
                    "city": "Formiga",
                    "neighborhood": "Centro",
                    "zipcode": "35570000"
                }
            },
            peso: 0,

            //Dados do usuario resgatados da api
            isUserLoggedIn: false,
            loggedInUser: {
                created_at: "",
                email: "",
                email_verified_at: null,
                id: 0,
                nasc: "",
                nome: "",
                telefone: "",
                type: 0,
                updated_at: ""
            },
            //Dados do usuario utilizados para registrar venda
            user: {
                email: "",
                nasc: "",
                nome: "",
                cpf: "",
                telefone: "",
                id: null
            },
            userInputErrors: {
                name: null,
                tel: null,
                email: null,
                cpf: null,
                birth: null,
            },
            isAdressRegistered: false,
            RegisteredAdress: {
                "user_id": 0,
                "cep": "",
                "uf": "",
                "cidade": "",
                "bairro": "",
                "rua": "",
                "numero": "",
                "complemento": ""
            },
            copyAdress: {
                "user_id": 0,
                "cep": "",
                "uf": "",
                "cidade": "",
                "bairro": "",
                "rua": "",
                "numero": "",
                "complemento": ""
            },
            localidade: null,
            //Variáveis para o funcionamento da interface
            index: 0,
            direction: null,
            carouselItemCount: 7

        }
    }
    listFrete = () => {
        const frete = this.state.OpcFrete;
        if (frete && frete.length) {
            const htmlFrete = frete.map((item, indice) => {


                return (
                    <div>

                    </div>
                )
            })
        }
    }
    componentDidMount() {
        const data = new Date();
        let formatData = "" + data.getFullYear() + "-" + (1 + data.getMonth()) + "-" + data.getDate();
        var array = [];
        var array2 = [];
        var array3 = [];
        for (let i = 0; i < 99; i++) {
            let tranformador = sessionStorage.getItem(i);
            if (tranformador != null) {
                let tranformado = JSON.parse(tranformador);
                array2.push(tranformado.ValorTotal);
                array.push(tranformado);
                array3.push((tranformado.ml * tranformado.QuantProd))
            }
        }
        this.setState(prevState => ({
            confirm: { ...prevState.confirm, items: array }
        }));
        let valor = 0;
        array2.reduce(function (total, numero) {
            valor = total + numero;
            return valor;
        }, 0)
        let peso = 0;
        array3.reduce(function (pesoTotal, num) {
            peso = pesoTotal + num;
            return peso;
        }, 0)
        this.setState(prevState => ({
            freteEnv: { ...prevState.freteEnv, peso: (peso / 1000) }
        }));
        this.setState(prevState => ({
            freteEnv: { ...prevState.freteEnv, valordeclarado: valor }
        }));
        this.setState(prevState => ({
            confirm: { ...prevState.confirm, amount: valor }
        }));
        const token = localStorage.getItem("JWT_token");
        if (token != null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
            };
            fetch("https://anorosa.com.br/Emporio037/api/me&adress", requestOptions)
                .then(data => data.json().then(data => {

                    if (data.status !== false) {

                        this.setState({ loggedInUser: data.user, isUserLoggedIn: data.status });
                        this.setState({ RegisteredAdress: data.adress, isAdressRegistered: data.status })
                        this.setState(prevState => ({
                            customerOFF: { ...prevState.customerOFF, name: data.user.nome }
                        }))
                        this.setState(prevState => ({
                            customerOFF: { ...prevState.customerOFF, email: data.user.email }
                        }))
                        this.setState(prevState => ({
                            customerOFF: { ...prevState.customerOFF, phone_numbers: "+55" + data.user.telefone }
                        }))
                        this.setState(prevState => ({
                            customerOFF: { ...prevState.customerOFF, external_id: data.user.id }
                        }))
                        this.setState(prevState => ({
                            shippingOFF: { ...prevState.shippingOFF, delivery_date: formatData }
                        }))
                        if (data.adress.length !== 0) {
                            this.setState({ Adress: data.adress, isUserLoggedIn: true });
                        }
                    }
                }))
                .catch(erro => this.setState(erro));


        }
    }
    enderecoList = () => {
        const end = this.state.RegisteredAdress;
        const status = this.state.status;
        if (end && end.length) {
            const htmlEnd = end.map((item, indice) => {
                return (
                    <div key={indice} className="custom-checkbox-control">
                        <input onClick={async () => {
                            this.setState(prevState => ({
                                shippingOFF: {
                                    ...prevState.shippingOFF, "address": {
                                        "country": "br",
                                        "street": item.rua,
                                        "street_number": item.numero,
                                        "state": item.uf.toLowerCase(),
                                        "city": item.cidade,
                                        "neighborhood": item.bairro,
                                        "zipcode": item.cep
                                    }
                                }
                            }));
                            this.setState({ copyAdress: item });
                            console.log(item.cep);
                            fetch(" https://viacep.com.br/ws/" + item.cep + "/json").then(data => data.json().then(data => {
                                console.log(data);
                                this.setState({ localidade: data.localidade })
                            }))
                        }} type="radio" className="custom-checkbox-input" id={indice} name="address" />
                        <label for={indice} className="custom-checkbox-label">
                            <div className="row no-gutters custom-checkbox-label-content">
                                {/* ICONE */}
                                <div className="col-auto custom-checkbox-label-icon">
                                    <div className="custom-checkbox-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>
                                {/* TEXTO */}
                                <div className="col custom-checkbox-label-text">
                                    <div className="adress-container">
                                        <address>{item.rua}, {item.numero}<br />{item.cidade} {item.uf} {item.cep.substring(0, 5) + "-" + item.cep.substring(5)}<br />{item.complemento}
                                        </address>
                                        <Link to={"/Perfil/Enderecos/Editar/" + item.id}>Editar</Link>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                )
            })
            return htmlEnd;

        } else if (!status) {

        } else {
            return (
                <div>
                    Load
                </div>
            )
        }

    }
    parcela3a6 = () => {
        let parcela = [3, 4, 5, 6];
        const htmlParcela = parcela.map((item, indice) => {
            let recebe = (this.state.confirm.amount + (this.state.confirm.amount * 1.19)) / item;
            return (
                <div key={indice} className="custom-checkbox-control">
                    <input onClick={() => {
                        this.setState(prevState => ({
                            confirm: { ...prevState.confirm, installments: item }
                        }))
                    }} type="radio" className="custom-checkbox-input" id={item} name="parcels" />
                    <label for={item} className="custom-checkbox-label">
                        <div className="row no-gutters custom-checkbox-label-content">
                            {/* ICONE */}
                            <div className="col-auto custom-checkbox-label-icon">
                                <div className="custom-checkbox-icon">
                                    <i>{item}x</i>
                                </div>
                            </div>
                            {/* TEXTO */}
                            <div className="col custom-checkbox-label-text">
                                <h3 className="h6 mb-0">R$ {recebe.toFixed(2).replace(".", ",")}  <span className="text-danger ml-3">Com juros</span></h3>
                            </div>
                        </div>
                    </label>

                </div>
            )
        })
        return htmlParcela

    }
    parcela7a12 = () => {
        let parcela = [7, 8, 9, 10, 11, 12];
        const htmlParcela = parcela.map((item, indice) => {
            let recebe = (this.state.confirm.amount + (this.state.confirm.amount * 1.59)) / item;
            return (
                <div key={indice} className="custom-checkbox-control">
                    <input type="radio" className="custom-checkbox-input" id={item} name="parcels" />
                    <label for={item} className="custom-checkbox-label">
                        <div className="row no-gutters custom-checkbox-label-content">
                            {/* ICONE */}
                            <div className="col-auto custom-checkbox-label-icon">
                                <div className="custom-checkbox-icon">
                                    <i>{item}x</i>
                                </div>
                            </div>
                            {/* TEXTO */}
                            <div className="col custom-checkbox-label-text">
                                <h3 className="h6 mb-0">R$ {recebe.toFixed(2).replace(".", ",")}  <span className="text-danger ml-3">Com juros</span></h3>
                            </div>
                        </div>
                    </label>

                </div>
            )
        })
        return htmlParcela

    }
    slideTo = (valInd) => {
        let index = valInd;
        let direction = null;
        this.setState({
            direction,
            index
        })
    }
    toggleCarousel = (direction) => {
        let index = this.state.index
        const [min, max] = [0, this.state.carouselItemCount - 1]

        if (direction === 'next') {
            if (index < max) {
                index++
            }
        }
        else if (direction === 'prev') {
            if (index > min) {
                index--
            }
        }
        this.setState({
            direction,
            index
        })
    }
    handleCPF = event => {
        const target = event.target;
        const value = target.value;
        this.setState(prevState => ({
            customerOFF: {
                ...prevState.customerOFF, documents: [{
                    "type": "cpf",
                    "number": value
                }]
            }
        }))

    }
    handleCartao = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            confirm: { ...prevState.confirm, [name]: value }
        }))
    }
    metodoPag = () => {

        if (this.state.localidade === "Lagoa da Prata") {
            return (
                <div className="custom-checkbox-control">
                    <input type="radio" className="custom-checkbox-input" id="pay3" name="payment_method" />
                    <label for="pay3" className="custom-checkbox-label">
                        <div className="row no-gutters custom-checkbox-label-content">
                            {/* ICONE */}
                            <div className="col-auto custom-checkbox-label-icon">
                                <div className="custom-checkbox-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                            </div>
                            {/* TEXTO */}
                            <div className="col custom-checkbox-label-text">
                                <h3 className="h6 mb-0">Pagar na entrega</h3>
                            </div>
                        </div>
                    </label>
                </div>
            )
        } else {
            return (
                <div className="custom-checkbox-control">
                    <input type="radio" className="custom-checkbox-input" id="pay2" name="payment_method" />
                    <label for="pay2" className="custom-checkbox-label">
                        <div className="row no-gutters custom-checkbox-label-content">
                            {/* ICONE */}
                            <div className="col-auto custom-checkbox-label-icon">
                                <div className="custom-checkbox-icon">
                                    <i className="fas fa-file-invoice"></i>
                                </div>
                            </div>
                            {/* TEXTO */}
                            <div className="col custom-checkbox-label-text">
                                <h3 className="h6">Boleto bancário</h3>
                            </div>
                        </div>
                    </label>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="container-lg  pt-5">
                <div className="row justify-content-end">
                    <div className="col-lg-10">
                        <h1 className="h2 mb-2">Checkout</h1>
                    </div>
                </div>
                {/* MODAL PARA CADASTRO DE NOVO ENDEREÇO */}
                <div className="modal" tabindex="-1" id="add_address">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Endereço de entrega</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" id="cep" className="form-control mb-2" />
                                    <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei meu CEP</a>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="estado">Estado</label>
                                        <input type="text" id="estado" className="form-control" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="cidade">Cidade</label>
                                        <input type="text" id="cidade" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="bairro">Bairro</label>
                                    <input type="text" id="bairro" className="form-control" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-8">
                                        <label for="rua">Rua</label>
                                        <input type="text" id="rua" className="form-control" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="numero">Número</label>
                                        <input type="text" id="numero" className="form-control" />
                                    </div>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="address-save" checked />
                                    <label className="custom-control-label" for="address-save">Salvar endereço para compras futuras</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row no-gutters" id="checkout">
                    <div className="col-lg-auto">
                        {/*STEPS */}
                        <div className="steps flex-lg-column">
                            <div className="step completed">
                                <span className="step-info">Informações<br /> pessoais</span>
                                <div className="indicator-container" title="Informações pessoais">
                                    <span className="step-indicator">
                                        <i className="fas fa-user icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step completed">
                                <span className="step-info">Endereço<br />de entrega</span>
                                <div className="indicator-container" title="Endereço de entrega">
                                    <span className="step-indicator">
                                        <i className="fas fa-map-marker-alt icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step active">
                                <span className="step-info">Opções <br />de frete</span>
                                <div className="indicator-container" title="Opções de frete">
                                    <span className="step-indicator">
                                        <i className="fas fa-shipping-fast icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step">
                                <span className="step-info">Método de<br /> pagamento</span>
                                <div className="indicator-container" title="Método de pagamento">
                                    <span className="step-indicator">
                                        <i className="fas fa-credit-card icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step">
                                <span className="step-info">Finalizar <br />a  compra</span>
                                <span className="step-indicator" title="Finalizar a compra">
                                    <i className="fas fa-check-double icon-default"></i>
                                    <i className="fas fa-check icon-active"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg shadow-sm" id="col-content">
                        <div className="row px-sm-4 py-sm-5" id="row-content">
                            {/* FORMULÁRIO */}
                            <div className="col-md-8">
                                <Carousel
                                    length={7}
                                    controls={false}
                                    interval={null}
                                    indicators={false}
                                    activeIndex={this.state.index}
                                    direction={this.state.direction}
                                >
                                    <Carousel.Item>
                                        <h2 className="step-title">Informações pessoais</h2>
                                        <div className="form-step">
                                            <div className="form-row">
                                                <div className="form-group col-sm">
                                                    <label for="nome">Nome completo</label>
                                                    {this.state.loggedInUser.nome !== ""
                                                        ? <input type="text" className="form-control" id="nome" value={this.state.loggedInUser.nome} readonly disabled />
                                                        : <input type="text" id="nome" name="nome" onChange={this.handleUserInputChange} className="form-control" id="nome" placeholder="Ryan W. Fonseca" />
                                                    }
                                                    {this.state.userInputErrors.name
                                                        ? <span className="errorSpan">{this.state.userInputErrors.name}</span>
                                                        : null
                                                    }
                                                </div>
                                                <div className="form-group col-sm">
                                                    <label for="cpf">CPF</label>
                                                    <input type="text" autocomplete="off" onChange={(e) => {
                                                        this.handleCPF(e)

                                                        this.CpfMask(e)
                                                    }} className="form-control" id="cpf" placeholder="999.999.999-99" />
                                                    {this.state.userInputErrors.cpf
                                                        ? <span className="errorSpan">{this.state.userInputErrors.cpf}</span>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                {this.state.loggedInUser.email != ""
                                                    ? <input type="email" className="form-control" id="email" name="email" readonly disabled value={this.state.loggedInUser.email} />
                                                    : <input type="email" onChange={this.handleUserInputChange} className="form-control" id="email" name="email" />
                                                }
                                                {this.state.userInputErrors.email
                                                    ? <span className="errorSpan">{this.state.userInputErrors.email}</span>
                                                    : null
                                                }
                                            </div>
                                            <div className="form-row mb-4">
                                                <div className="form-group col-sm">
                                                    <label for="celular">Celular</label>
                                                    {this.state.loggedInUser.telefone != ""
                                                        ? <input type="text" className="form-control" id="celular" name="celular" readonly disabled value={this.state.loggedInUser.telefone.replace(/\(|\)|-/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3')} />
                                                        : <input type="text" onChange={(e) => this.TelephoneMask(e)} className="form-control" id="celular" name="celular" />
                                                    }
                                                    {this.state.userInputErrors.tel
                                                        ? <span className="errorSpan">{this.state.userInputErrors.tel}</span>
                                                        : null
                                                    }
                                                </div>
                                                <div className="form-group col-sm">
                                                    <label for="nascimento">Nascimento</label>
                                                    {this.state.loggedInUser.nasc !== ""
                                                        ? <input type="date" className="form-control" id="nascimento" name="nascimento" value={this.state.loggedInUser.nasc} readonly disabled />
                                                        : <input onChange={this.handleUserInputChange} type="date" className="form-control" id="nasc" name="nasc" />
                                                    }
                                                    {this.state.userInputErrors.birth
                                                        ? <span className="errorSpan">{this.state.userInputErrors.birth}</span>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-primary" onClick={async () => {
                                                    if (this.state.isUserLoggedIn) {

                                                        await this.setState(prevState => ({ //Não discuta cmg, aqui tem q ser await se nn dá erro ok? Ok.
                                                            user: {
                                                                ...prevState.user,
                                                                email: this.state.loggedInUser.email,
                                                                nasc: this.state.loggedInUser.nasc,
                                                                nome: this.state.loggedInUser.nome,
                                                                telefone: this.state.loggedInUser.telefone,
                                                                id: this.state.loggedInUser.id
                                                            }
                                                        }));


                                                        if (this.validateUserInfo()) {
                                                            this.toggleCarousel('next')
                                                        }
                                                    } else {
                                                        if (this.validateUserInfo()) {
                                                            this.toggleCarousel('next')
                                                        }
                                                    }
                                                }}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* ENDEREÇO DE ENTREGA */}
                                        <h2 className="step-title">Endereço de entrega</h2>
                                        <div className="form-step">
                                            <p>Clique em algum endereço abaixo para seleciona-lo</p>
                                            <div className="custom-controls-container">
                                                <div className="custom-controls-container">
                                                    <div>
                                                        {this.enderecoList()}</div>
                                                    <a type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#add_address">
                                                        Novo endereço
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => {
                                                    this.toggleCarousel('next');
                                                }

                                                }>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* FRETE DOS PRODUTOS */}
                                        <h2 className="step-title">Opções de frete</h2>
                                        <div className="form-step">
                                            <p>Clique em uma das opções abaixo para selecionar o frete</p>
                                            <div className="custom-controls-container">
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="shipping1" name="shipping" />
                                                    <label for="shipping1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-shipping-fast"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="shipping-name">Expresso</h3>
                                                                <span className="shipping-price">R$ 34,00</span>
                                                                <p className="shipping-info">Chegará entre os dias 21 e 25 de agosto </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="custom-controls-container">
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="shipping1" name="shipping" />
                                                    <label for="shipping1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-shipping-fast"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="shipping-name">Expresso</h3>
                                                                <span className="shipping-price">R$ 34,00</span>
                                                                <p className="shipping-info">Chegará entre os dias 21 e 25 de agosto </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => {
                                                    this.toggleCarousel('next');
                                                    this.metodoPag()
                                                }}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* MÉTODO DE PAGAMENTO */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <p>Selecione um método de pagamento</p>
                                            <div className="custom-controls-container">

                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="pay1" name="payment_method" />
                                                    <label for="pay1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-credit-card"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6">Cartão de crédito</h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                {this.metodoPag()}

                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* DADOS DO CARTÃO */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <h3 className="form-step-title">Dados do cartão</h3>
                                            <div className="form-row align-items-sm-center">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label for="card-number">Número</label>
                                                        <input name="card_number" onChange={this.handleCartao} maxLength="16" type="text" className="form-control" id="card-number" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="card-title">Nome do portador</label>
                                                        <input name="card_holder_name" onChange={this.handleCartao} type="text" className="form-control" id="card-title" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 order-first order-sm-last">
                                                    <div className="flip-card">
                                                        <div className="flip-card-inner">
                                                            <img src={card_front} className="invisible img-fluid" alt="" />
                                                            <div className="flip-card-front">
                                                                <img src={card_front} alt="" />
                                                            </div>
                                                            <div className="flip-card-back">
                                                                <img src={card_back} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-8 col-sm-6">
                                                    <label for="card-number">Validade</label>
                                                    <input name="card_expiration_date" onChange={this.handleCartao} maxLength="4" type="text" className="form-control" id="card-number" />
                                                </div>
                                                <div className="form-group col">
                                                    <label for="card-number">CVV</label>
                                                    <input name="card_cvv" onChange={this.handleCartao} maxLength="3" type="text" className="form-control" id="card-number" />
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* NÚMERO DE PARCELAS */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <h3 className="form-step-title mb-4">Número de parcelas</h3>
                                            <div className="custom-controls-container">
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="parcel1" name="parcels" />
                                                    <label for="parcel1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i>1x</i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6 mb-0">R$ {(this.state.confirm.amount / 1).toFixed(2).replace(".", ",")}  <span className="text-success ml-3">Sem juros</span></h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="parcel2" name="parcels" />
                                                    <label for="parcel2" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i>2x</i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6 mb-0">R$ {(this.state.confirm.amount / 2).toFixed(2).replace(".", ",")}  <span className="text-success ml-3">Sem juros</span></h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="collapse" id="collapse">
                                                    {this.parcela3a6()}
                                                    {this.parcela7a12()}
                                                </div>
                                                <a className="btn btn-outline-primary" data-toggle="collapse" href="#collapse" role="button" aria-expanded="false" aria-controls="collapse">Mostrar mais opções</a>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* CONFIRMAR COMPRA */}
                                        <h2 className="step-title">Finalizar a compra</h2>
                                        <div className="form-step">
                                            <p>Revise os dados e finalize a sua compra</p>

                                            {/* DADOS DE ENTREGA */}
                                            <h3 className="h5">Entrega</h3>
                                            <ul className="list-group list-group-flush show-info-container">
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <address className="mb-0">
                                                                        {this.state.copyAdress.rua}, {this.state.copyAdress.numero}<br />
                                                                        {this.state.copyAdress.cidade} {this.state.copyAdress.uf.toUpperCase()}, {this.state.copyAdress.cep.substring(0,5)+"-"+this.state.copyAdress.cep.substring(5)}<br />
                                                                        {this.state.copyAdress.complemento}
                                                                    </address>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(1)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-shipping-fast"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <h3 className="shipping-name">Expresso</h3>
                                                                    <span className="shipping-price m-sm-2 d-sm-inline">R$ 34,00</span>
                                                                    <p className="shipping-info">Chegará entre os dias 21 e 25 de agosto </p>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(2)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            {/* DADOS DE PAGAMENTO */}
                                            <h3 className="h5">Pagamento</h3>
                                            <ul className="list-group list-group-flush show-info-container">
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-credit-card"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <span>{this.state.confirm.card_number.substring(0, 4) + " " + this.state.confirm.card_number.substring(4, 8) + " " + this.state.confirm.card_number.substring(8, 12) + " " + this.state.confirm.card_number.substring(12, 16)}</span><br />
                                                                    <span>{this.state.confirm.card_expiration_date.substring(0, 2) + "/" + this.state.confirm.card_expiration_date.substring(2, 4)}</span> <span className="ml-2">CVV: 662</span><br />
                                                                    <span>{this.state.confirm.card_holder_name}</span><br />
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(4)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i>1x</i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <h3 className="h6 mb-0">R$ 60,00 <span className="text-success ml-3">Sem juros</span></h3>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(5)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            {/* FRETE E VALOR TOTAL */}
                                            <div className="cart-values mb-0 mb-sm-5">
                                                <div className="row">
                                                    <div className="col-sm mb-3 mb-sm-0">
                                                        <div className="form-row align-items-end">
                                                            <div className="col">
                                                                <h3 className="price-confirm">Frete</h3>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="shipping-price-confirm">R$ 84,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm mb-5 mb-sm-0">
                                                        <div className="form-row align-items-end">
                                                            <div className="col">
                                                                <h3 className="price-confirm">Total</h3>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="shipping-price-confirm">R$ 1200,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AÇÕES */}
                                            <div className="step-actions">
                                                <a className="btn btn-success" href="#steps" role="button" data-slide="next">
                                                    Finalizar a compra
                                                </a>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            {/* CARRINHO DE COMPRA */}
                            <DetalheCarrinho />
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    //User form validations and masks

    validateUserInfo() {
        const user = this.state.user;

        var validate = true;
        this.setState({ userInputErrors: { name: null, tel: null, email: null, cpf: null, birth: null, } });

        if (user.nome !== null) {//namevalidation
            if (user.nome.length < 3 || user.nome.length > 44) {
                this.UserInputSetError("name", "O nome deve ter entre 3 e 44 caracteres.");
                validate = false;
            }
        } else {
            this.UserInputSetError("name", "Insira um nome");
            validate = false;
        }
        if (user.nasc !== null) {//birthvalidation
            var birth = user.nasc;
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            if (!birth.match(regEx)) {
                this.UserInputSetError("birth", "Insira uma formatação de data válida");
                validate = false;
            };
            let nasc = birth.split("-").map(Number);
            let depois18Anos = new Date(nasc[0] + 18, nasc[1] - 1, nasc[2]);
            let agora = new Date();

            if (depois18Anos >= agora) {
                this.UserInputSetError("birth", "Somente maiores de 18 anos podem comprar este tipo de produto")
                validate = false;
            }
        } else {
            this.UserInputSetError("birth", "Insira uma data de nascimento");
            validate = false;
        }
        if (user.cpf !== null) {//Cpf validation
            if (user.cpf.length !== 11) {
                this.UserInputSetError("cpf", "Insira um cpf válido");
                validate = false;
            }
        } else {
            this.UserInputSetError("cpf", "Insira o seu cpf");
            validate = false;
        }
        if (user.email !== null) {//Email validation
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(user.email.toLowerCase())) {
                this.UserInputSetError("email", "Email inválido");
                validate = false;
            }
        } else {
            this.UserInputSetError("email", "Insira um email");
            validate = false;
        }
        if (user.telefone !== null) {
            if (user.telefone.length !== 11) {
                this.UserInputSetError("tel", "Número de telefone inválido");
                validate = false;
            } else {
                if (!/^[0-9]+$/.test(user.telefone)) {
                    this.UserInputSetError("tel", "Digite apenas números para seu telefone.")
                    validate = false;
                }
            }
        } else {
            this.UserInputSetError("tel", "Insira um número de telefone");
            validate = false;
        }

        return validate;
    }
    UserInputSetError(input, errormsg) {
        this.setState(prevState => ({
            userInputErrors: { ...prevState.userInputErrors, [input]: errormsg }
        }));
    }

    TelephoneMask = (e) => {
        let numero = e.target.value;
        e.target.value = numero.replace(/\(|\)|-/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');
        if (numero.length === 11) {
            this.setState(prevState => ({
                user: { ...prevState.user, telefone: numero.replace(/\(|\)|-/g, '') }
            }));
        }
        if (numero.length < 11) {
            this.setState(prevState => ({
                user: { ...prevState.user, telefone: "" }
            }));
        }
    }
    CpfMask = (e) => {

        let cpf = e.target.value;
        let cpfMask = cpf;
        e.target.value = cpfMask.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\(|\)|-/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
        if (cpf.length === 11) {
            this.setState(prevState => ({
                user: { ...prevState.user, cpf: cpf.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\(|\)|-/g, '') }
            }));
        }
        if (cpf.length < 11) {
            this.setState(prevState => ({
                user: { ...prevState.user, cpf: "" }
            }));
        }
    }
    handleUserInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
    };
}

export default Checkout;