import React, { Component } from 'react';
import './Admin.css';

class AddCateg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: {
        nomecategoria: "",
        img: null,
      },
      inputerror: {
        nomecategoria: null,
        img: null,
      }
    }
  }
  async onChangeImg(file) {
    var base64 = null;
    var reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = await function () {
      base64 = reader.result;
      console.log(base64);
      this.setState({ categoria: { img: base64 } })
    }.bind(this);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      categoria: { ...prevState.categoria, [name]: value }
    }));
    console.log(this.state.categoria);
  };
  handleSubmit = event => {
    const token = localStorage.getItem("JWT_token")
    console.log(token);
    fetch("http://anorosa.com.br/Emporio037/api/categoria/add", {
      method: "post",
      body: JSON.stringify(this.state.categoria),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then(data => data.json().then(data => {
      if (data.status !== true) {
        if (data.error === 1) {//Input error code
          this.setState({ inputerror: data.errors })
          alert('Erro ao cadastrar categoria.')
        } else {
          alert(data.error)
        }
      } else {
        this.setState({
          inputerror: {
            nomecategoria: null,
            img: null
          }
        })
        alert("Categoria cadastrada com sucesso!!!");
      }
    })).catch(erro => this.setState({ erro: erro }));
    event.preventDefault();
  };
  formCateg = () => {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome da Categoria</label>
              <input onChange={this.handleInputChange} name="nomecategoria" type="text" class="form-control" id="inputText1" />
              <span className="error">{this.state.inputerror.nomecategoria}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Imagem</label>
              <input onChange={(e) => this.onChangeImg(e.target.files[0])} enctype="multipart/form-data" name="img" type="file" class="form-control" id="inputPassword4" />
              <span className="error">{this.state.inputerror.img}</span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar Categoria</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.formCateg()}
      </div>
    );
  }
}

export default AddCateg;