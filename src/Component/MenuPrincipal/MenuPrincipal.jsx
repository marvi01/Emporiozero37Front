import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import Categoria from '../Categoria/Categoria';
import MenuSuperior from '../MenuSuperior/MenuSuperior';

class MenuPrincipal extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                <Categoria/>                
            </div>
        );
    }
}

export default MenuPrincipal;