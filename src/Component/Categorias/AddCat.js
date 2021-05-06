import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import swal from 'sweetalert';
import CategoriaContext from '../../Context/Categorias/CategoriaContext';
import './styles.scss';

export default function AddCat(){
    //inicializa de los inputs
    const [newCat, setNewCat] = useState({
        description: '',
        idPadre: '',
        errorDescription: '',
        errorSelect: ''        
    });
  
    //acceso a las variables / funciones de la data
    const { categorias, AddCategoria }  = useContext( CategoriaContext );

    //actualiza el estado de la data
    useEffect(() => {    
        AddCategoria();
    }, [categorias, AddCategoria]);

    //validacion antes de registrar una nueva categoria
    const handleValidation = () => {   
        let formValid = true;

        if( newCat.description === '' ){
            setNewCat({ 
                ...newCat, 
                errorDescription: "Ingrese el Nombre de la Categoria" 
            }); 
            formValid = false;
        }else{
            setNewCat({ ...newCat, errorDescription: '' });
        }

        if(  newCat.idPadre === '' ){
            setNewCat({ ...newCat, errorSelect: 'Seleccione una Categoria' });;      
            formValid = false;    
        }else{
            setNewCat({ ...newCat, errorSelect: '' });
        }  
        
        return formValid;
    }
    
    //funcion para validar u registrar nueva categoria
    const OnSubmit = (e) => {
        e.preventDefault();
        
        if( handleValidation() ){            
            AddCategoria( newCat.description, newCat.idPadre );
            setNewCat({
                ...newCat,
                description: '',
                idPadre: ''
            });
            swal({
                title: "Mensaje",
                text: "Categoria Agregada",
                icon: "success",
                button: "Aceptar"
            });            
        }
    }

    return(
        <div className="container"> 
            <div className="card row col-md-6 mx-auto">
                <div className="card-title text-center h5 pt-4">
                    Añadir Categoria
                </div>
                <div className="card-body">
                    <form onSubmit={ OnSubmit }>
                        <div className="form-group">
                            <label> Categoria </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese el Nombre de la Categoria" 
                                onChange={ (e) => setNewCat({ ...newCat, description: e.target.value }) }
                                value={ newCat.description }    
                                pattern="^[A-Za-z0-9. ]*[A-Za-z0-9. ][A-Za-z0-9. ]*$" 
                                title="El nombre de la categoria solo puede contener solo letras(aA-zZ), numeros(0-9) y punto(.) "                                             
                                required
                            />
                            <span className="text-danger"> {newCat.errorDescription} </span> 
                        </div>
                        <div className="form-group">
                            <label>Seleccione una Categoria</label>
                            <select 
                                className="form-control"
                                onChange={ (e) => setNewCat({ ...newCat, idPadre: parseInt(e.target.value) }) }
                                value={ newCat.idPadre }
                                required
                            >
                            <option value="">Seleccione una Categoria ...</option>
                            {categorias.map( item => {
                                return <option key={item.id}
                                    value={ item.id }
                                >{item.description}</option>
                            })}                                
                            </select>
                            <span className="text-danger"> {newCat.errorSelect} </span>  
                        </div>
                        <div className="form-group text-center mt-5">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>        
        </div>
    )
}