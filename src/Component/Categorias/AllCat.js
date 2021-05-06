import { useEffect }  from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CategoriaContext from '../../Context/Categorias/CategoriaContext';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReorderIcon from '@material-ui/icons/Reorder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function AllCat(){

    const { categorias, DelCategoria, categoriaOrdenada }  = useContext( CategoriaContext );
    const rows = [];

    // invoco categoriaOrdenada, para acceder a la data transformada en un arbol(parent/children)
    useEffect(() => {   
        categoriaOrdenada();
    },[categorias, categoriaOrdenada]);

    //funcion delete, eliminar categoria
    const deleteCat = (id) => {
        DelCategoria(id);
        swal({
            title: "Mensaje",
            text: "Categoria Eliminada",
            icon: "success",
            button: "Aceptar"
        }); 
    }

    // Funcion para  encontrar  hijos pertenecientes a un padre
    const row = (item, tab) => { 
        return (
            <div className="row mb-2 itemcat mx-0" key={item.id} >
                <div className="col-md-10">                
                    <ReorderIcon style={{ color: '#afafaf' }} /> 
                     { tab + item.description } 
                </div>
                <div className="row col-md mx-auto">
                    <Link 
                        to={`/editcat/${item.id}`} 
                        className="col-md px-0" 
                        title="Editar categoria"
                    >
                        <Box>
                            <EditIcon style={{ color: '#daa520' }} />
                        </Box>
                    </Link>   
                    <button
                        className="col-md px-0"
                        onClick={ () => deleteCat(item.id) }
                        title="Eliminar categoria"
                    >
                        <Box>
                            <DeleteForeverIcon style={{ color:'#ff0000' }} /> 
                        </Box>                                    
                    </button>   
                </div>
            </div>               
        );
    }
   
    //Funcion que lista las categorias, arma la lista de categorias con sus subcategorias(paren/children)
    const ListadoCat = ( data, tab) => {
     
        data.forEach(item => {
            if (Object.keys(item).length === 0) {
                return
            }
            rows.push( row(item, tab) );
    
            if (item.child && item.child.length > 0) {                
                ListadoCat(item.child, tab+'\u00A0\u00A0\u00A0\u00A0\u00A0' );
            }
        });
        return rows;
    }    

    return(
        <div className="container mx-auto"> 
            <div className="card col-md-7 mx-auto listCat px-0">
                <h4 className="card-title text-center px-0 mx-0 border-bottom py-1">Categorias </h4>            
                <div className="card-body px-0"> 
                    { 
                        categorias.length === 1?
                            <div className="text-danger text-center"> No hay caregorias Registradas, Crear una <Link to={"/addCat"}>Categoria</Link> </div>     
                        :    
                        ListadoCat( categoriaOrdenada(), "" )                         
                    }               
                </div>    
            </div>        
        </div>
    )
};

export default AllCat;
