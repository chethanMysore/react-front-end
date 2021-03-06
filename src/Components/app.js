//React Dependencies
import React, { Component } from "react";
import ReactDOM from "react-dom";
import cookie from "react-cookies";

//Components
import { ItemList } from "./ItemList";
import { AddItem } from "./AddItem";
import { Filter } from "./Filter";
import { ToastrWrapper } from "./ToastrWrapper";
//Reducers
import Reducer from "../Reducers";
//Base style for app
import "../../Styles/app.css";

//React-router for routing support
import { Router, Route, Link, hashHistory, IndexRoute } from "react-router";
// import { history } from 'react-router/lib/BrowserHistory'

//Main component - app root component
export class App extends Component {
  constructor(props) {
    super(props);
  }

  //Render method of App component
  render() {
    const navStyle = {
      backgroundColor: "#125ea5",
    };
    const searchStyle = {
      top: "10px",
    };
    const svgStyle = {
      stroke: "#125ea5",
      strokeWidth: "2",
      opacity: "0.5",
    };
    const svgOutline = {
      position: "relative",
      left: "-30px",
    };

    return (
      <div>
        <nav className="navbar navbar-inverse bg-faded" style={navStyle}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#items">
                <div className="image-container">
                  <img
                    src="../../images/illinois-tech-with-seal.svg"
                    width="100"
                    height="50"
                  ></img>
                </div>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#items">
                    Items
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#add">
                    Add Item
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ToastrWrapper />
            </div>
          </div>
          <div className="row">
            <div id="toastr" className="col-sm-12"></div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <Filter />
            </div>
            <div className="col-sm-1">
              <svg width="22" height="500">
                <rect x="0" y="20" width="1" height="500" style={svgStyle} />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div className="col-sm-7" id="view">
              <Router history={hashHistory}>
                <Route path="/items" component={ItemList} />

                <Route path="/add" component={AddItem} />
              </Router>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <svg width="1000" height="2" style={svgOutline}>
                <rect x="0" y="20" width="1200" height="1" style={svgStyle} />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Render method that collects the state info and renders the React virtual DOM
const render = () => {
  let itemStore = Reducer.store.getState();
  let imageStore = Reducer.imageStore.getState();
  let filterStore = Reducer.filter.getState();

  ReactDOM.render(
    <App devStore={itemStore} imgStore={imageStore} filter={filterStore} />,
    document.getElementById("root")
  );
};
//Subscriptions to stores
Reducer.store.subscribe(render);
Reducer.imageStore.subscribe(render);
Reducer.filter.subscribe(render);

//Invokes the above render method
render();
