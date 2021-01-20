import React, { Component } from 'react';
import { ApiWebUrl, usuarioLocal } from '../utils';
import $ from 'jquery/dist/jquery';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faHome, faTags, faBoxOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import icon1 from '../assets/icons/agregar.png';
export default class Categoria extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaCategorias: [],
            nombre: "",
            descripcion: "",
            usuario: null,
            categoriaSeleccionadaIdcategoria: "",
            categoriaSeleccionadaNombre: "",
            categoriaSeleccionadaDescripcion: "",
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

        this.obtenerCategorias();
    }

    cerrarSesion = () => {
        localStorage.removeItem("DatosUsuario")
        this.setState({
            usuario: null
        })
        this.props.history.push('/')
    }

    obtenerCategorias() {
        const rutaServicio = ApiWebUrl + "serviciocategorias.php";
        var myheaders = new Headers();
        myheaders.set('Cache-Control', 'no-cache, must-revalidate');
        myheaders.set('Expires', '0')
        fetch(rutaServicio,
            {
                method: 'GET',
                headers: myheaders
            }
        )
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        listaCategorias: result
                    })
                }
            )
    }

    dibujarCategorias = (datosTablaCategorias) => {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTablaCategorias.map(itemCategoria =>
                        <tr key={itemCategoria.idcategoria}>
                            <td>{itemCategoria.idcategoria}</td>
                            <td>{itemCategoria.nombre}</td>
                            <td>{itemCategoria.descripcion}</td>
                            <td><FontAwesomeIcon className="fa-icon" icon={faPen} onClick={() => this.mostrarActualizar(itemCategoria)} /></td>
                            <td><FontAwesomeIcon className="fa-icon" icon={faTimes} onClick={() => this.categoriaEliminar(itemCategoria)} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    categoriaEliminar(itemCategoria) {
        var respuesta = window.confirm("¿Está seguro que desea eliminar la categoría " + itemCategoria.nombre + " ?");
        if (respuesta === true) {
            const rutaServicio = ApiWebUrl + "categoriaseliminar.php";

            var formData = new FormData();
            formData.append("idcategoria", itemCategoria.idcategoria)

            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            })

                .then(
                    () => {
                        this.obtenerCategorias();
                        alert("Se eliminó la categoría " + itemCategoria.nombre);
                    }
                )
        }

    }

    mostrarActualizar(itemCategoria) {
        this.setState({
            categoriaSeleccionadaIdcategoria: itemCategoria.idcategoria,
            categoriaSeleccionadaNombre: itemCategoria.nombre,
            categoriaSeleccionadaDescripcion: itemCategoria.descripcion,
        })

        $("#modalActualizar").modal();
    }

    dibujarFormularioAgregar() {
        return (
            <div id="formulario-agregar">
                <form onSubmit={this.categoriasInsertar}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nombre"
                            onChange={(e) => this.setState({ nombre: e.target.value })}
                            required minLength="3" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Descripción"
                            onChange={(e) => this.setState({ descripcion: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn btn-primary" onClick={this.ocultarFormularioAgregar} >Cerrar</button>
                    </div>
                </form>
            </div>
        )
    }

    categoriasInsertar = (e) => {
        e.preventDefault();
        const rutaServicio = ApiWebUrl + "registrarcategorias.php";

        var formData = new FormData();
        formData.append("nombre", this.state.nombre)
        formData.append("descripcion", this.state.descripcion)
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                res => res.text()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.obtenerCategorias();
                    this.ocultarFormularioAgregar();
                    alert("Se agregó una nueva categoría con id " + result);
                }
            )
    }



    mostrarFormularioAgregar() {
        $("#formulario-agregar").slideDown("slow");
    }
    ocultarFormularioAgregar() {
        $("#formulario-agregar").slideUp("slow");
    }

    categoriasActualizar = (e) => {
        const rutaServicio = ApiWebUrl + "categoriasactualizar.php";

        var formData = new FormData();
        formData.append("idcategoria", this.state.categoriaSeleccionadaIdcategoria)
        formData.append("nombre", this.state.categoriaSeleccionadaNombre)
        formData.append("descripcion", this.state.categoriaSeleccionadaDescripcion)
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })

            .then(
                () => {
                    this.obtenerCategorias();
                    $("#modalActualizar").modal("toggle");
                    alert("Se actualizo la categoría con id " + this.state.categoriaSeleccionadaIdcategoria);
                }
            )
    }

    dibujarModal() {
        return (
            <div class="modal fade" id="modalActualizar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Actualizar categoría</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div class="modal-body">
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.categoriaSeleccionadaIdcategoria} disabled />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Nombre" value={this.state.categoriaSeleccionadaNombre}
                                        onChange={(e) => this.setState({ categoriaSeleccionadaNombre: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Descripción" value={this.state.categoriaSeleccionadaDescripcion}
                                        onChange={(e) => this.setState({ categoriaSeleccionadaDescripcion: e.target.value })} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onClick={() => this.categoriasActualizar()}>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let contenidoCategorias = this.dibujarCategorias(this.state.listaCategorias);
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
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
                            <Link className="nav-link text-light font-italic" to="/">
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
                    <h6 class="display-4 text-black">Mantenimiento Categorias </h6>
                  
                           
                    <a href="/"> <img src={icon1} /> Nueva </a>

                    <div class="separator"></div>
                    <div class="row">
                        <div class="col-md-7 container-fluid">

                            <div className="form-group">
                                <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>
                                    Nueva categoría</button>

                            </div>
                            {contenidoFormularioAgregar}
                            {contenidoCategorias}

                        </div>
                        {contenidoModal}
                    </div>
                </div>
            </>
        );
    }
}