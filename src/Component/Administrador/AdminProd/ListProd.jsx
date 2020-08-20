import React, { Component } from 'react';

class ListProd extends Component {

    componentDidMount(){
        fetch("https://anorosa.com.br/Emporio037/api/produto/list")
        .then(data => data.json().then(data => {
            this.setState({ categoria: data.data })
            this.setState({ status: data.status })
            console.log(data);
        }))
        .catch(erro => this.setState(erro));
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ListProd;