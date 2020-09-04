import React, { Component } from 'react';
import './Admin.css';

class EditCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "id": 0,
                "nomecategoria": "",
                img:""
            },
            inputerror: {
              nomecategoria: null,
              img: null, 
            },
            startname: null,
            "status": false
        }
    }

    componentDidMount() {
        const categ = this.props.match.params;
        fetch("https://anorosa.com.br/Emporio037/api/categoria/"+categ.id)
            .then(data => data.json().then(data => {
                this.setState({ data: data.data, startname: data.data.nomecategoria });
                this.setState({ status: data.status });
            }))
            .catch(erro => this.setState(erro));

    }
    formCateg =()=>{

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome da Categoria</label>
                            <input defaultValue={this.state.data.nomecategoria} onChange={this.handleInputChange} name="nomecategoria" type="text" class="form-control" id="inputText1" />
                            <span className="error">{this.state.inputerror.nomecategoria}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Imagem</label>
                            <input defaultValue={this.state.data.img} onChange={this.handleInputChange} name="img" type="file" class="form-control" id="inputPassword4" />
                            <span className="error">{this.state.inputerror.img}</span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Cadastrar Categoria</button>
                </form>
            </div>
        )
     }
     handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
          categoria: { ...prevState.categoria, [name]: value }
        }));
      };
      handleSubmit = event => {
        const id = this.props.match.params;
        const token = localStorage.getItem("JWT_token");
        var json;
        if(this.state.categoria.nomecategoria === this.state.startname){
          json = {
            "img": this.state.data.img
          }
        }else{
          json = this.state.categoria;
        }
        fetch("https://anorosa.com.br/Emporio037/api/categoria/update/"+id.id, {
          method: "put",
          body: JSON.stringify(json),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })
        .then(data => data.json().then(data => {
          if (data.status !== true) {
            if (data.error === 1) {//Input error code
              this.setState({ inputerror: data.errors })
              alert('Erro ao alterar categoria.')
            } else {
              alert(data.error)
            }
          } else {
            this.setState({
              inputerror: {
                nomecategoria: null,
                img: null
              }
            });
            alert("Categoria alterada com sucesso!!!");
          }
        })).catch(erro => this.setState({ erro: erro }));
        event.preventDefault();
      };
    render() {
        return (
            <div>
               {this.formCateg()} 
            </div>
        );
    }
}

export default EditCateg;