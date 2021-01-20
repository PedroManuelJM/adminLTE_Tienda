import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApiWebUrl, usuarioLocal } from '../utils';
import Swal from 'sweetalert2';
export default class Panel extends Component {

    state ={
        usuario :null
      };
    
    componentDidMount(){
      const usuarioL = usuarioLocal();
      if(usuarioL !== null ){
        this.setState({
          usuario: usuarioL 
        })
      }
      if(usuarioL === null ){
        alert("No tiene acceso a esta página")
        this.props.history.push('/')
    }

    }

    cerrarSesion= () => {
        localStorage.removeItem("DatosUsuario")
        this.setState({
          usuario: null 
        })
        this.props.history.push('/')
      }


    render(){ 

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
              <div className="container">
              <a className="navbar-brand" href="https://pedromanueljm.github.io/react-routerdom/#/">Mega Tienda</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/colaboradores">Colaboradores</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/empleados">Empleados</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/catalogo">Catálogo</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/carrito">Carrito</Link>
                  </li>
                  {this.state.usuario !==null ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
              <strong>Hola {this.state.usuario.nombres}!</strong> 
                    </Link>
                  </li>
            :<li></li>}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <button className="btn btn-danger" onClick={(e) => this.cerrarSesion()}>Cerrar sesión</button>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tablas
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/tablacategorias">Categorias</Link>
                    </div>
                  </li>
                </ul>
            
              </div>
              </div>
            </nav>
              );
              }
  
}