import React, { Component } from 'react';
import Admin from '../Admin';

class AddProd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produto: {
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
                "categoria_id": 0
            },
            categoria: {
                "id": 0,
                "nomecategoria": ""
            },
            status: false
        }
    }
    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ categoria: data.data })
                this.setState({ status: data.status })
            }))
            .catch(erro => this.setState(erro));
    }
    render() {
        return (
            <div>
                <Admin />
                {console.log(this.state)}
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome do Produto</label>
                            <input name="nomeprod" type="text" class="form-control" id="inputText1" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input name="descricao" type="text" class="form-control" id="inputPassword4" />
                        </div>
                    </div><div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputCity">Preço</label>
                            <input name="preco" type="text" class="form-control" id="inputCity" />
                        </div>
                        <div class="form-group col-md-2">
                            <label  for="inputState">Teor</label>
                            <input name="teor" type="number" id="inputState" class="form-control"/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Quantidade</label>
                            <input name="quantidade" type="number" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Desconto</label>
                            <input name="desconto" type="number" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">ML</label>
                            <input name="ml" type="number" class="form-control" id="inputZip" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputState">Categorias</label>
                            <select id="inputState" class="form-control">
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Imagem</label>
                            <input name="foto" type="file" class="form-control" id="inputZip" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        );
    }
}

export default AddProd;