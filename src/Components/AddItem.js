//React Dependencies
import React, { Component } from "react";

//Redux Reducer
import Reducer from "../Reducers";

//Add Item Component to add new Item to database
export class AddItem extends Component {
  constructor(props) {
    super(props);
    Reducer.store.subscribe(this.render);
  }

  //Render method of AddItem used to render a form to get details of the Item
  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="ItemName" className="col-sm-2">
            Item Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              required
              className="form-control"
              ref={(node) => {
                this.name = node;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ItemKey" className="col-sm-2">
            Item Key
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              required
              className="form-control"
              ref={(node) => {
                this.key = node;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ItemType" className="col-sm-2">
            Item Type
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              required
              className="form-control"
              ref={(node) => {
                this.type = node;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ItemImage" className="col-sm-2">
            Upload an Image
          </label>
          <div className="col-sm-4">
            <input
              type="file"
              required
              className="form-control"
              ref={(node) => {
                this.file = node;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-3">
            <input
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let formData = {
                  ItemName: this.name.value,
                  ItemKey: this.key.value,
                  ItemType: this.type.value,
                };
                let imgData = {
                  imgId: this.name.value,
                  imgFile: this.file.files[0],
                };
                Reducer.store.dispatch({
                  type: "ADD_DEVICE",
                  data: formData,
                });

                /*Reducer.store.dispatch({
                            type: 'ADD_DEVICE',
                            data: formData
                        });*/
                Reducer.imageStore.dispatch({
                  type: "ADD_IMAGE",
                  data: imgData,
                });
              }}
              value="ADD"
            />
          </div>
        </div>
      </form>
    );
  }
}
