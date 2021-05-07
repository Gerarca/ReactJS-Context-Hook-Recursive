import { useState } from 'react';
import CategoriaContext from './CategoriaContext';
import Data from '../../Data/Categorias.json';

const CategoriaState = (props) => {

    const [ categorias, setCategorias ] = useState(Data);
    //Añadir simple, solo recogemos las variables, la añadimos y actualizamos la data mediante hook
    const AddCategoria = (description, idPadre) => {
        
        if( !description || idPadre === "" ){
            return false;
        }
        const newItem = {
            id: categorias.length + 1,
            description: description,
            idPadre: idPadre
        };
        setCategorias([ ...categorias, newItem ]);  
        return true;
    };

    function DelCategoria(idnodo) {
        let updatedData = [];
        let indexBorrar = categorias.findIndex(item => item.id === idnodo);
        if(indexBorrar >= 0) {
            // Primero se buscan los hijos, item.padre = id de nodo actual
            let hijos = categorias.filter(item => item.idPadre == idnodo);
            // Recorrer y ejecutar recursivamente
            hijos.forEach(hijo => DelCategoria(hijo.id));            
            categorias.splice(indexBorrar, 1);  // descartamos los id hijos
        }
        updatedData = [...categorias]; // nueva data
        setCategorias(updatedData); // actualiazmos el estado
    }
    // solo buscamos el id a modificar y le pasamos las nuevas variables
    const EditCategoria = (id, description, idPadre) => {
        const newData = categorias.map( item => {
            if ( item.id === id ) {
                item.description = description
                item.idPadre = idPadre
            }
            return item;
        });
        setCategorias( newData );
        return true; 
    };      

    //Funcion para editar categoria, retorna las categorias existentes, sin tomar en cuenta el id al que se esta editando
    const listadoCatEdit = (id) => {
        if( !id ){
            return null;
        } 
        return categorias.filter(item => item.id !== parseInt(id));
    }

    //para llamar la funcion recursiva, que servira para construir el arbor de la data
    const categoriaOrdenada = () => {    
        return OrderRecursivo( categorias, categorias[0].id);
    }

    //funcion recursiva, para armar el arbol de la data
    function OrderRecursivo(categorias, id){ 
        let node = [];
        categorias
        .filter(function(d){ return d.idPadre === id})
        .forEach(function(d){
          var cd = d;
          cd.child = OrderRecursivo(categorias, d.id);
          return node.push(cd);
        })
        
        return node;
    }
    //se declaran las variables/funciones a la que podemos acceder
    return(         
        <CategoriaContext.Provider
                    value={{ 
                            categorias: categorias,
                            AddCategoria,
                            DelCategoria,
                            EditCategoria,
                            listadoCatEdit,
                            categoriaOrdenada
                    }}                 
        >
            {props.children}
        </CategoriaContext.Provider> 
    )
  
};

export default CategoriaState;

