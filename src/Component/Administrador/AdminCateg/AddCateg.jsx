import React, { Component } from 'react';

class AddCateg extends Component {
    constructor(props) {
        super(props);
        this.state={
            categoria :{
                nomecategoria: "",
                img: null, 
            }
        }
    }
     formCateg =()=>{

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome da Categoria</label>
                            <input onChange={this.handleInputChange} name="nomecategoria" type="text" class="form-control" id="inputText1" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Imagem</label>
                            <input onChange={this.handleInputChange} name="img" type="file" class="form-control" id="inputPassword4" />
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
        console.log(this.state.categoria);
      };
      handleSubmit = event => {
        const token = localStorage.getItem("JWT_token")
        fetch("https://anorosa.com.br/Emporio037/api/categoria/add", {
          method: "post",
          body: JSON.stringify(this.state.categoria),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })
          .then(data => {
            if (data.ok) {
              this.setState({ redirect: true });
              console.log(data);
              alert('Cadastrado com sucesso')
              return data.json();
            } else {
              data.json().then(data => {
                if (data.error) {
                  this.setState({ erro: data.error });
                }
              });
            }
          }).catch(erro => this.setState({ erro: erro }));
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

export default AddCateg;