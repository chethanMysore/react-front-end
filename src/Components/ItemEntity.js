//React Dependencies
import React, { Component } from "react";
import Redux from "redux";

//ItemEntity Component - used to render a single record
export class ItemEntity extends Component {
  constructor(props) {
    super(props);
  }

  //Render method of ItemEntity - renders a single record
  render() {
    return (
      <div className="row" key={this.props.Item.itemId}>
        <div className="col-sm-1">{this.props.Item.ItemId}</div>
        <div className="col-sm-2">{this.props.Item.ItemName}</div>
        <div className="col-sm-2">{this.props.Item.ItemType}</div>
        <div className="col-sm-1">{this.props.Item.ItemKey}</div>
      </div>
    );
  }
}
