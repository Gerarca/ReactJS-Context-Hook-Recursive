import React, { Component } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CategoriaState from './Context/Categorias/CategoriaState';
import AddCat from './Component/Categorias/AddCat';
import Allcat from './Component/Categorias/AllCat';
import Editcat from './Component/Categorias/EditCat';

class App extends Component {
  
   
  render(){
    return(
      <CategoriaState>
        <div className="container">        
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">             
                <h1 className="text-center">Bienvenido</h1>
              </Route>
              <Route path="/addcat">
                <AddCat />
              </Route>
              <Route path="/allcat">
                <Allcat />
              </Route>            
              <Route path="/editcat/:id"> 
                <Editcat />
              </Route>
            </Switch>
          </Router> 
        </div>
      </CategoriaState>      
    )
  }
}

export default App;
