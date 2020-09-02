import React, { Component } from 'react';

class AddCarrosel extends Component {
    constructor(props) {
        super(props);
        this.state={
            destaque :{
                fotodestaque: null, 
            }
        }
    }
    formDestaque =()=>{
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Imagem</label>
                            <input onChange={(e) => this.onChangeImg(e.target.files[0])} enctype="multipart/form-data" name="img" type="file" class="form-control" id="inputPassword4" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Cadastrar Destaque</button>
                </form>
            </div>
        )
     }
     async onChangeImg(file){
        var base64 = null;
        var reader = new FileReader();
         await reader.readAsDataURL(file);
          reader.onload = await function () {
          base64 = reader.result;
          
          this.setState({destaque: {fotodestaque: base64}})
         }.bind(this);
         reader.onerror = function (error) {
           console.log('Error: ', error);
         };
        
     }
     handleSubmit = event => {
        const token = localStorage.getItem("JWT_token")
        console.log(token);
        fetch("http://anorosa.com.br/Emporio037/api/destaque/add", {
          method: "post",
          body: JSON.stringify(this.state.destaque),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })
          .then(async data => {
            if (data.ok) {
              this.setState({ redirect: true });
              console.log(await data.json());
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
                {this.formDestaque()}
            </div>
        );
    }
}
export default AddCarrosel;