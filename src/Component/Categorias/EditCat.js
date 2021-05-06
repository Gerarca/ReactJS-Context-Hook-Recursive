import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useContext } from 'react';
import swal from 'sweetalert';
import { Link, useHistory, useParams } from "react-router-dom";
import CategoriaContext from '../../Context/Categorias/CategoriaContext';
import './styles.scss';

const EditCat = () => {
    //inicializamos y le damos acceso a las variables / funciones para acceder a la data
    const { categorias, EditCategoria }  = useContext( CategoriaContext );
    //para inicializar y obtener cada value de los inputs
    const [selectedCat, setSelectedCat] = useState({
        id: '',
        description: '',
        idPadre: ''
    });    
    //para mostrar algun error de tipeo o seleccion vacia
    const [ error, setError ] = useState({
        errorId: '',
        errorDescription : '',
        errorSelect: ''
    });
    //para obtener el id de la categoria que vamos  a editar
    const history = useHistory();
    const { id } = useParams();

    //actualiza el estado de la categoria seleccionada
    useEffect(() => {         
        const selectedCat = categorias.find( item => item.id == id);
        setSelectedCat(selectedCat);
    },[categorias, id]);     

    //validacion de los input
    const handleValidation = () => {   
        let formValid = true;

        if( selectedCat.Description === '' ){
            setError({ ...error, errorDescription : "Ingrese el Nombre de la Categoria" });            
            formValid = false;
        }else{
            setError({ ...error, errorDescription : "" });  
        }

        if(  selectedCat.idPadre === "" ){
            setError({ ...error, errorSelect : "Ingrese el Nombre de la Categoria" });                    
            formValid = false;    
        }else{
            setError({ ...error, errorSelect : "" });    
        } 

        if(  selectedCat.id === '' ){
            //error
            formValid = false;    
        }
        
        return formValid;        
    }

    //registra update de la categoria
    const OnSubmit = () => {
        if( handleValidation() ){
            EditCategoria( selectedCat.id, selectedCat.description, selectedCat.idPadre );
            setSelectedCat({
                ...selectedCat,
                id : '',
                description : '',
                idPadre : ''
            });
            swal({
                title: "Mensaje",
                text: "Categoria Editada",
                icon: "success",
                button: "Aceptar"
            });             
            history.push("/allcat");
        }
    }

    return(                                                 
        <div className="container"> 
            <div className="card row col-md-6 mx-auto"> 
            {
                !id? 
                    <div className="alert alert-danger"> Error de Categoria volver atras <Link to="/allcat"></Link> </div>
                : 
                <>
                    <div className="card-title text-center h5 mt-4">
                        Editar Categoria
                    </div>
                    <div className="card-body">
                        <form onSubmit={ OnSubmit }>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1"> Categoria </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Ingrese el Nombre de la Categoria" 
                                    onChange={ (e) => setSelectedCat({ ...selectedCat, description : e.target.value })  }
                                    value={ selectedCat.description }    
                                    pattern="^[A-Za-z0-9. ]*[A-Za-z0-9. ][A-Za-z0-9. ]*$" 
                                    title="El nombre de la categoria solo puede contener solo letras(aA-zZ), numeros(0-9) y punto(.) "             
                                    required
                                /> 
                                { error.errorDescription? <span className="text-danger"> error.errorDescription </span> : null }                        </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Seleccione una Categoria</label>
                                <select 
                                    className="form-control"
                                    onChange={ (e) => setSelectedCat({ ...selectedCat, idPadre : parseInt(e.target.value) }) }
                                    value={ selectedCat.idPadre }
                                    required
                                >
                                <option value=""> Seleccione una Categoria... </option>
                                {categorias.map( item => {
                                    return <option key={item.id}
                                        value={ item.id }
                                    >{item.description}</option>
                                })}                                
                                </select>
                                { error.errorSelect? <span className="text-danger"> error.errorSelect </span> : null }
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mx-auto mt-5" >Guardar</button>
                            </div>
                        </form>                        
                    </div>                
                </> 
            }
            </div>   
            <div className="mx-auto mt-3 text-center">
                <Link to="/allcat" className="links"> <ArrowBackIosIcon/> Volver </Link>     
            </div>
        </div> 
    );
};

export default EditCat;