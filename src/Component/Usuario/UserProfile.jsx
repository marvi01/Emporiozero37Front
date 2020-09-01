import React, { Component } from 'react'; //Importa o método componente e react
import './UserProfile.css';//Importa css
import AddressNotFound from '../../imagens/address.jpg';


class UserProfile extends Component {
   

    render() {//Aqui acontece a renderização da página
        //O metodo return define o que vai ser renderizado no site
        return (
            <div>
                <div className="user-page-title">
                    <h1 className="h2 mb-0">Meu perfil</h1>
                    <p className="mb-5 mb-sm-3">Edite os dados da conta, os seus dados pessoais e endereços de entrega</p>
                </div>
                <div className="container">
                    <div className="row no-gutters justify-content-center">
                        <div className="col-lg-10">
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-key"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Dados da conta</h2>
                                            <p className="mb-sm-0">Edite as suas credenciais para autenticação</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Email</h3>
                                                </div>
                                                <div className="col">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <span>Ryanfonseca183@gmail.com</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <a href="">Editar<i className="ml-2 fas fa-long-arrow-alt-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Senha</h3>
                                                </div>
                                                <div className="col">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <span>*******</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <a href="arquivo6.html">Editar<i className="ml-2 fas fa-long-arrow-alt-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Dados pessoais</h2>
                                            <p className="mb-sm-0">Edite as suas informações pessoais</p>
                                        </div>
                                        <div className="col-sm-auto">
                                            <a href="arquivo5.html">Editar <i className="ml-2 fas fa-long-arrow-alt-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Nome</h3>
                                                </div>
                                                <div className="col">
                                                    <span>Ryan William Fonseca</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">CPF</h3>
                                                </div>
                                                <div className="col">
                                                    <span>152.674.226-81</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Nascimento</h3>
                                                </div>
                                                <div className="col">
                                                    <span>06-07-2001</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row no-gutters">
                                                <div className="col-sm-4">
                                                    <h3 className="h6">Celular</h3>
                                                </div>
                                                <div className="col">
                                                    <span>(37) 99875-5117</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card profile-card">
                                <div className="profile-card-header">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="col">
                                            <h2 className="h4 mb-1">Endereços de entrega</h2>
                                            <p className="mb-0">Edite as localizações de entrega dos seus pedidos</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="form-row flex-nowrap align-items-center">
                                                <div className="col">
                                                    <address>
                                                        <strong> Rosimary Silva Pereira, 286</strong><br/>
                                                        Santo Antonio<br/>
                                                        Formiga, MG 35574-061<br/>
                                                        (37) 3322-0949
                                                    </address>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="dropdown dropleft">
                                                        <button className="btn-reset dropdown-toggle" type="button" data-toggle="dropdown">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Editar</a>
                                                            <a className="dropdown-item" href="#">Deletar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="form-row flex-nowrap align-items-center">
                                                <div className="col">
                                                    <address>
                                                        <strong className="text-bold">Rosimary Silva Pereira, 286</strong><br/>
                                                        Santo Antonio<br/>
                                                        Formiga, MG 35574-061<br/>
                                                        (37) 3322-0949
                                                    </address>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="dropdown dropleft">
                                                        <button className="btn-reset dropdown-toggle" type="button" data-toggle="dropdown">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Editar</a>
                                                            <a className="dropdown-item" href="#">Deletar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* CASO NÃO HAJA ENDEREÇOS CADASTRADOS, EXIBIR ESSE CONTEÚDO

                                    <div className="address-not-found">
                                        <div className="row no-gutters justify-content-center">
                                            <div className="col-md-4">
                                                <img src={AddressNotFound} className="img-fluid" alt="Endereços de entrega não encontrados">
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-8 col-lg-6">
                                                <h3>Nenhum endereço cadastrado</h3>
                                                <p>Por favor, cadastre ao menos uma localização para que a gente possa carregar essas informações durante a compra.</p>
                                            </div>
                                        </div>
                                    </div>

                                    */}
                                </div>
                                <div className="card-footer">
                                    <div className="row no-gutters">
                                        <div className="col-sm-auto">
                                            <a href="arquivo4.html" className="btn btn-block btn-primary">
                                                Cadastrar novo endereço
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
            </div>
        );
    }
}
export default UserProfile; //Aqui retorna o componente