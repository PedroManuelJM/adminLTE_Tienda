import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApiWebUrl, usuarioLocal } from '../utils';
import Swal from 'sweetalert2';
import $ from 'jquery/dist/jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTags, faBoxOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: null,

    }
  }

  componentDidMount() {
    const usuarioL = usuarioLocal();
    if (usuarioL !== null) {
      this.setState({
        usuario: usuarioL
      })
    }
    if (usuarioL === null) {
      alert("No tiene acceso a esta página")
      this.props.history.push('/')
    }
  }

  cerrarSesion = () => {
    localStorage.removeItem("DatosUsuario")
    this.setState({
      usuario: null
    })
    this.props.history.push('/')
  }

  abrirtoggle() {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
    });
  }

  render() {

    return (
      <>
        <div class="vertical-nav bg-dark" id="sidebar">
          <div class="py-4 px-3 mb-4 bg-dark">
            <div class="media-body">
              <h4 class="font-weight-white text-muted mb-0">Admin LTE</h4>
              <p class="font-weight-grey text-muted mb-0"></p>
            </div>
          </div>
          <p class="text-white font-weight-bold text-uppercase px-3 small pb-4 mb-0">Mantenimiento</p>
          <ul class="nav flex-column bg-dark mb-0">
            <li class="nav-item">
              <Link className="nav-link text-light font-italic" to="/categoria">
                <FontAwesomeIcon className="fa-icon" icon={faHome}
                /> Home
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link text-light font-italic" to="/categoria">
                <FontAwesomeIcon className="fa-icon" icon={faBoxOpen}
                /> Productos
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link text-light font-italic" to="/categoria">
                <FontAwesomeIcon className="fa-icon" icon={faTags}
                /> Marcas
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link text-light font-italic" to="/categoria">
                <FontAwesomeIcon className="fa-icon" icon={faTags}
                /> Categorias
              </Link>
            </li>
          </ul>
          <p class="text-white font-weight-bold text-uppercase px-3 small py-4 mb-0">Reportes</p>
          <ul class="nav flex-column bg-dark mb-0">
            <li class="nav-item">
              <a href="#" class="nav-link text-light font-italic">
                <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
                		Area charts
            		</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-light font-italic">
                <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
                		Bar charts
            		</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-light font-italic">
                <i class="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
                		Pie charts
            		</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-light font-italic">
                <i class="fa fa-line-chart mr-3 text-primary fa-fw"></i>
                		Line charts
            		</a>
            </li>
          </ul>
          <hr></hr>
          <ul class="nav flex-column bg-dark mb-0">
            <li class="nav-item">
              <Link className="nav-link text-light font-italic" onClick={(e) => this.cerrarSesion()} > <FontAwesomeIcon className="fa-icon" icon={faTimesCircle} /> Salir </Link>
            </li>
          </ul>
        </div>
        <div class="page-content p-5" id="content">
          <button id="sidebarCollapse" type="button" class="btn btn-dark bg-dark rounded-pill shadow-sm px-4 mb-4" onClick={this.abrirtoggle}><i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold">Toggle</small></button>
          <h2 class="display-4 text-black">Bienvenido al Panel de Administración</h2>
          <p class="lead text-black mb-0"> " Admin "</p>
          <div class="separator"></div>
          <div class="row">
            <div class="col-md-7 container-fluid">

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>

        
      </>



    );
  }

}