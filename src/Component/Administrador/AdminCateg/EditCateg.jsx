import React, { Component } from 'react';

class EditCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "nomecategoria": "",
                img:""
            },
            "status": false
        }
    }

    componentDidMount() {
        const categ = this.props.match.params;
        fetch("https://anorosa.com.br/Emporio037/api/categoria/"+categ.id)
            .then(data => data.json().then(data => {
                this.setState({ data: data.data });
                this.setState({ status: data.status });
                console.log(this.state.data);
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
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Imagem</label>
                            <input defaultValue={this.state.data.img} onChange={this.handleInputChange} name="img" type="file" class="form-control" id="inputPassword4" />
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
        const id = this.props.match.params;
        const token = localStorage.getItem("JWT_token")
        fetch("https://anorosa.com.br/Emporio037/api/categoria/update/"+id.id, {
          method: "put",
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
              alert('Atualizado com sucesso')
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
      console.log(this.state.data);
        return (
            <div>
               {this.formCateg()} 
            </div>
        );
    }
}

export default EditCateg;