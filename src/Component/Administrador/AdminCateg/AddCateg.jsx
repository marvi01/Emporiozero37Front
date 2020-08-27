import React, { Component } from 'react';

class AddCateg extends Component {
    constructor(props) {
        super(props);
        this.state={
            categoria :{
                nomecategoria: "",
                img: "", 
            }
        }
    }
     formCateg =()=>{

        return(
            <div>
                <form>
                <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome da Categoria</label>
                            <input name="nomeprod" type="text" class="form-control" id="inputText1" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Imagem</label>
                            <input name="descricao" type="file" class="form-control" id="inputPassword4" />
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