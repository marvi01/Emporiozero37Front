import React, { useState, useEffect } from 'react';
import { data } from 'jquery';



export default function Carrinho(props) {

  const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);

    const prencherArray = () => {
        var array = []

        for (let i = 0; i < 10; i++) {
            let tranformador = sessionStorage.getItem(i);
            if (tranformador != null) {
                
                let tranformado = JSON.parse(tranformador);
                array.push(tranformado);
                
            }
        }
        setProd(array);
        console.log(array);
    }
    useEffect(() => {
      prencherArray()
  }, [count]);
  const exibiCarrinho = () => {

    if (Prod && Prod.length) {
        const ProdutoCarrinho = Prod.map((item, indice) =>
            (
              <div key={indice}>
                <p>{item.ValorTotal}</p>
                {console.log(Prod)}
                ssss
              </div>
            )
        )

        return ProdutoCarrinho;
    } else {
        return (
            <div>
                <a>
                    Nenhum produto encontrado no carrinho :(
                </a>

            </div>)
    }

}
  
      return(
      <div>
        {exibiCarrinho()}
      </div>
      )
    

}