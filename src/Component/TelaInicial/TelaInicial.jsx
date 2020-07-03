import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import BestSellers from '../Sections/BestSellers/BestSellers';
import Promotions from '../Sections/Promotions/Promotions';
import Releases from '../Sections/Releases/Releases';

import Categorias from '../Categorias/Categorias';

{/*}
import ExibeCategoria from '../ExibeCategoria/ExibeCategoria';
*/}

class TelaInicial extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                {/*
                    <ExibeCategoria />
                */}
                <main className="py-5">
                    <div className="container-md">
                        <Categorias />
                        <BestSellers/>
                        <Promotions />
                        <Releases />
                    </div>
                </main>
            </div>
        );
    }
}

export default TelaInicial;