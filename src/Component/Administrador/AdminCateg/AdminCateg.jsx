import React, { Component } from 'react';

class AdminCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "nomecategoria": ""
            },
            "status": false
        }
    }

    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ data: data.data });
                this.setState({ status: data.status });
                console.log(this.state.data);
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

export default AdminCateg;