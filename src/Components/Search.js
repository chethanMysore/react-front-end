//React Dependencies
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Reducer from "../Reducers";

//Search Component - renders a search box and filters data according to input
export class Search extends Component {
  //Constructor - subscribes to the store
  constructor(props) {
    super(props);
    this.filterByName = this.filterByName.bind(this);
    this.filterByKey = this.filterByKey.bind(this);
    this.filterByType = this.filterByType.bind(this);
    this.dispatchFilterData = this.dispatchFilterData.bind(this);
  }

  //filters data by name
  filterByName(name) {
    if (name == null || name.length == 0) {
      ReactDOM.render(<div></div>, document.getElementById("suggestions"));
    } else {
      var nameStr = "";
      nameStr = name.toLowerCase();
      let regex = new RegExp(".*" + nameStr + ".*");
      let filteredArray = [];
      let filteredData = this.props.allData;
      if (filteredData != null)
        filteredArray = filteredData.filter((data) =>
          regex.test(data.ItemName.toLowerCase())
        );
      ReactDOM.render(
        <div>
          {filteredArray.map((Item) => (
            <div className="row" key={Item.ItemId}>
              <div className="col-sm-3">
                <a href="#" onClick={() => this.dispatchFilterData(Item)}>
                  {Item.ItemName}
                </a>
              </div>
            </div>
          ))}
        </div>,
        document.getElementById("suggestions")
      );
    }
  }

  //filters data by key
  filterByKey(key) {
    if (key == null || key.length == 0) {
      ReactDOM.render(<div></div>, document.getElementById("suggestions"));
    } else {
      var nameStr = "";
      nameStr = key.toLowerCase();
      let regex = new RegExp(".*" + nameStr + ".*");
      let filteredArray = [];
      let filteredData = this.props.allData;
      if (filteredData != null)
        filteredArray = filteredData.filter((data) =>
          regex.test(data.ItemKey.toLowerCase())
        );
      ReactDOM.render(
        <div>
          {filteredArray.map((Item) => (
            <div className="row" key={Item.ItemId}>
              <div className="col-sm-3">
                <a href="#" onClick={() => this.dispatchFilterData(Item)}>
                  {Item.ItemName}
                </a>
              </div>
            </div>
          ))}
        </div>,
        document.getElementById("suggestions")
      );
    }
  }

  //filters data by type
  filterByType(type) {
    if (type == null || type.length == 0) {
      ReactDOM.render(<div></div>, document.getElementById("suggestions"));
    } else {
      var nameStr = "";
      nameStr = type.toLowerCase();
      let regex = new RegExp(".*" + nameStr + ".*");
      let filteredArray = [];
      let filteredData = this.props.allData;
      if (filteredData != null)
        filteredArray = filteredData.filter((data) =>
          regex.test(data.ItemType.toLowerCase())
        );
      ReactDOM.render(
        <div>
          {filteredArray.map((Item) => (
            <div className="row" key={Item.ItemId}>
              <div className="col-sm-3">
                <a href="#" onClick={() => this.dispatchFilterData(Item)}>
                  {Item.ItemName}
                </a>
              </div>
            </div>
          ))}
        </div>,
        document.getElementById("suggestions")
      );
    }
  }

  //dispatches filtered data to store
  dispatchFilterData(Item) {
    if (Item != null && Item.length != 0) {
      var itemArray = [];
      itemArray.push({
        ItemId: Item.ItemId,
        ItemName: Item.ItemName,
        ItemKey: Item.ItemKey,
        ItemType: Item.ItemType,
      });
      Reducer.filter.dispatch({
        type: "SET_FILTER_DATA",
        data: itemArray,
      });
    }
  }

  //resets the filteredArray
  resetFilter() {
    var data = [];
    Reducer.filter.dispatch({
      type: "SET_FILTER_DATA",
      data: data,
    });
  }

  //render method of Search component - renders a search box
  render() {
    switch (this.props.filterBy) {
      case "name": {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search Here"
                  ref={(node) => {
                    this.name = node;
                  }}
                  onKeyUp={() => this.filterByName(this.name.value)}
                />
              </div>
            </div>
            <div className="row" height="150">
              <div className="col-sm-3" id="suggestions"></div>
            </div>
          </div>
        );
      }
      case "key": {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search Here"
                  ref={(node) => {
                    this.key = node;
                  }}
                  onKeyUp={() => this.filterByKey(this.key.value)}
                />
              </div>
            </div>
            <div className="row" height="150">
              <div className="col-sm-3" id="suggestions"></div>
            </div>
          </div>
        );
      }
      case "type": {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search Here"
                  ref={(node) => {
                    this.type = node;
                  }}
                  onKeyUp={() => this.filterByType(this.type.value)}
                />
              </div>
            </div>
            <div className="row" height="150">
              <div className="col-sm-3" id="suggestions"></div>
            </div>
          </div>
        );
      }
    }
  }
}
