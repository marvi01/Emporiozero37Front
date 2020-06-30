import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import ExibeCategoria from '../ExibeCategoria/ExibeCategoria';
import MenuSuperior from '../MenuSuperior/MenuSuperior';

class TelaInicial extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                <ExibeCategoria/>                
            </div>
        );
    }
}

export default TelaInicial;