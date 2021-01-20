/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React, { Component } from 'react';
import { ApiWebUrl, usuarioLocal } from './utils';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario:'',
            clave:''
        }
    }
    componentDidMount(){
        if(usuarioLocal() !== null) this.props.history.push('/panel')
    }
  
    iniciarsesion =() => {
        if(this.state.usuario === "") return alert("Ingrese el usuario")
        if(this.state.clave === "") return alert("Ingrese la contraseña")

        const rutaServicio = ApiWebUrl + "iniciarsesion.php";

        var formData = new FormData();
        formData.append("usuario",this.state.usuario) 
        formData.append("clave",this.state.clave)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(  
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result); 
                this.evaluarInicioSesion(result)               
            }
        )
    }
    evaluarInicioSesion = (result) => {
        if(result === -1){
            return  Swal.fire({
              text: ' El usuario no existe ',
              timer: 2000,
              icon: 'warning',
              timerProgressBar: true,
            })
        }else if(result === -2){
            return  Swal.fire({
              text: ' Contrasena incorrecta ',
              timer: 2000,
              icon: 'error',
              timerProgressBar: true,
            })
        }

        localStorage.setItem("DatosUsuario",JSON.stringify(result[0]))

        Swal.fire({
            title: `Bienvenido: ${result[0].nombre}`,
            text: 'Ahora puede acceder a su información',
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
            window.location.reload(false)      
          })
    }
    render(){
        return(
          <section id="inicioSesion" className="padded">
          <div className="container">
              <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-2"></div>
              <div className="col-md-3">
                 <br></br><br></br><br></br><br></br><br></br>
                  <h5 className="text-center">Acceso Autorizado</h5>
                  <form>
                     <div class="input-group">
                          <div class="input-group-prepend">
                           <div class="input-group-text" id="btnGroupAddon"> <FontAwesomeIcon className="fa-icon" icon={faUser} /></div>
                          </div>
                          <input type="text" className="form-control" placeholder="admin"
                           value={this.state.usuario}
                           onChange={(e) => this.setState({usuario: e.target.value})}
                          />
                     </div>
                     <br></br>
                     <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text" id="btnGroupAddon"><FontAwesomeIcon className="fa-icon" icon={faUnlock} /></div>
                        </div>
                        <input type="password" className="form-control" placeholder="1234567"
                        value={this.state.clave}
                        onChange={(e) => this.setState({clave: e.target.value})}
                          />
                     </div>
                     <br></br>
                     <div class="container text-center">
                        <button type="button" className="btn btn-success" onClick={this.iniciarsesion} ><FontAwesomeIcon className="fa-icon" icon={faSignInAlt} /> Iniciar sesión</button>
                     </div>
                     
                      <br></br><br></br><br></br>
                  </form>
                 
              </div>
              <div className="col-md-4"></div>
              
          </div>
          </div>
      </section>
        )
    }
}