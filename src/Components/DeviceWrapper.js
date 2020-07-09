//React Dependencies
import React, { Component } from "react";

//ItemList Component
import { ItemList } from "./ItemList";

//A Wrapper to ItemList Component
export class ItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }

  //Render method of Item Wrapper - creates the ItemList component
  render() {
    return <ItemList />;
  }
}
