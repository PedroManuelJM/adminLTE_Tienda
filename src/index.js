import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { HashRouter, Route, Switch } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Panel from './Components/Panel';
import Footer from './Components/Footer';
import Categoria from './Components/Categoria';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter  basename={process.env.PUBLIC_URL + "/"}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/panel" component={Panel}/>
        <Route exact path="/categoria" component={Categoria}/>
      </Switch>
     
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
