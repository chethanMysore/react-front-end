//React dependencies
import React, { Component } from "react";

//AddItem component
import { AddItem } from "./AddItem";

//Redux Reducer
import Reducer from "../Reducers";

//A Wrapper for AddItem Component
export class AddItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }

  //Render method of AddItemWrapper - creates the AddItem Component
  render() {
    return <AddItem />;
  }
}
