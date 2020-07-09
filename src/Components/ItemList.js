//React Dependencies
import React, { Component } from "react";
import ReactDOM from "react-dom";

//Item Entity Component
import { ItemEntity } from "./ItemEntity";
import { ImageEditor } from "./ImageEditor";
import { NewImageEditor } from "./NewImageEditor";
import { Toastr } from "./Toastr";
//Reducers
import Reducer from "../Reducers";

//Bootstrap Dependencies
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

//ItemList Component
export class ItemList extends Component {
  constructor(props) {
    super(props);
    Reducer.store.subscribe(this.render);
    Reducer.imageStore.subscribe(this.render);
    Reducer.filter.subscribe(this.render);

    this.imageFormatter = this.imageFormatter.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch("http://localhost:3050")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Reducer.store.dispatch({
          type: "SET_ALL_DEVICES",
          data: data,
        });
        Reducer.message.dispatch({
          type: "ADD_MESSAGE",
          message: "Data Fetched Successfully",
        });
        data.map((Item) => {
          fetch("http://localhost:3050/api/download/" + Item.ItemName, {
            headers: { "response-type": "blob" },
          })
            .then((res) => {
              return res.blob();
            })
            .then((data) => {
              let imgData = {
                imgId: Item.ItemName,
                imgUrl: window.URL.createObjectURL(data),
              };

              Reducer.imageStore.dispatch({
                type: "SET_ALL_IMAGES",
                data: imgData,
              });
            });
        });
      });
  }

  //Event which is called when the component mounts on the page - GET Items is called here
  componentDidMount() {
    this.getData();
    /*  var msg = "Data fetched successfully";
          var fadeIn = "toastrStyle";
          var fadeOut = "toastr-fade-out";
           Reducer.toastr.dispatch({
                  type: 'SET_STATE'
              });
          
          setTimeout(function () {
             ReactDOM.render(<Toastr message={msg}  />, document.getElementById('toastr'));
          }, 3000);
          setTimeout(function () {
              Reducer.toastr.dispatch({ type: 'RESET_STATE' });
              //this.forceUpdate();
               ReactDOM.render(<Toastr message={msg} />, document.getElementById('toastr'));
          }, 6000);
          Reducer.message.dispatch({type: 'ADD_MESSAGE',message: msg});*/
  }

  //A Formatter for bootstrap table cell - for displaying images
  imageFormatter(cell, row) {
    return (
      <pre>
        <img src={cell} alt="No Preview Available" width="80" height="60" />
        <img
          src="../public/download.ico"
          alt="download"
          height="25"
          width="25"
          onClick={() => this.saveAs(cell, row.ItemName)}
        />
      </pre>
    );
  }

  //Creates a download link for the image
  saveAs(dataURL, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    let url = dataURL;
    a.href = url;
    a.download = fileName + ".jpg";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  //Render method of ItemList - renders the table of items
  render() {
    let state = Reducer.store.getState();
    let imgState = Reducer.imageStore.getState();
    let filterState = Reducer.filter.getState();
    var allFilteredData = Reducer.getAllFilteredData(
      filterState.getFilterReducer
    );
    var itemData = [];
    var allItems = [];

    allItems = Reducer.getAllItems(state.getItemReducer);
    var allImages = [];
    allImages = Reducer.getAllImages(imgState.getImageReducer);
    if (allFilteredData != null && allFilteredData.length != 0) {
      let devImg = [];
      allFilteredData.map((Item) => {
        devImg = allImages.filter((img) => img.imgId == Item.ItemName);
        itemData.push({
          ItemId: Item.ItemId,
          ItemName: Item.ItemName,
          ItemKey: Item.ItemKey,
          ItemType: Item.ItemType,
          ItemImage: devImg[0] != null ? devImg[0].imgUrl : "",
        });
      });
    } else {
      if (allItems != null && allItems.length != 0) {
        let devImg = [];
        allItems.map((Item) => {
          if (allImages != null && allImages.length != 0) {
            devImg = allImages.filter((img) => img.imgId == Item.ItemName);
          }
          itemData.push({
            ItemId: Item.ItemId,
            ItemName: Item.ItemName,
            ItemKey: Item.ItemKey,
            ItemType: Item.ItemType,
            ItemImage: devImg[0] != null ? devImg[0].imgUrl : "",
          });
        });
      }
    }
    function onBeforeSaveCell(row, cellName, cellValue) {
      //Any Validations before accepting the edited value
    }
    function onAfterSaveCell(row, cellName, cellValue) {
      Reducer.store.dispatch({
        type: "UPDATE_DEVICE",
        data: row,
      });
      location.reload();
    }
    function onAfterDeleteRow(rowKey) {
      Reducer.store.dispatch({
        type: "DELETE_DEVICE",
        data: rowKey,
      });
      location.reload();
    }
    function onAfterInsertRow(row) {
      console.log(row);
      var data = {
        ItemId: row.ItemId,
        ItemName: row.ItemName,
        ItemKey: row.ItemKey,
        ItemType: row.ItemType,
      };
      var imgData = {
        imgId: row.ItemName,
        imgFile: row.ItemImage,
      };
      Reducer.store.dispatch({
        type: "ADD_DEVICE",
        data: data,
      });
      Reducer.imageStore.dispatch({
        type: "ADD_IMAGE",
        data: imgData,
      });
    }
    const newNameEditor = (column, attr, editorClass, ignoreEditable) => {
      return <input type="text" className={`${editorClass}`} {...attr} />;
    };
    const newImageEditor = (column, attr, editorClass, ignoreEditable) => {
      /*function getFieldValue(){
                return this.refs.newImage.files[0];
            }
            return (
                <input type='file' className={`${editorClass}`} ref='newImage' />
            );*/
      return (
        <NewImageEditor
          ref={attr.ref}
          editorClass={editorClass}
          ignoreEditable={ignoreEditable}
        />
      );
    };
    const createImageEditor = (onUpdate, props) => <ImageEditor {...props} />;
    const cellEditProp = {
      mode: "dbclick",
      beforeSaveCell: onBeforeSaveCell,
      afterSaveCell: onAfterSaveCell,
      blurToSave: true,
    };
    const selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      clickToSelectAndEditCell: true,
      hideSelectColumn: true,
      bgColor: "#edeef9",
      className: "row-selected",
    };
    const options = {
      page: 1, //default page to display
      sizePerPageList: [
        {
          //dropdown for selecting the page size
          text: "3",
          value: 3,
        },
        {
          text: "6",
          value: 6,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "ALL",
          value: itemData.length,
        },
      ],
      sizePerPage: 3, //initial page size
      pageStartIndex: 1, //starting index of a page
      paginationSize: 3, //number of records displayed in each page
      prePage: "Prev", //Alias for previous page
      nextPage: "Next", //Alias for next page
      firstPage: "First", //Alias for first page
      lastPage: "Last", //Alias for last page
      paginationPosition: "bottom", //position of page navigation menu
      noDataText: "No Record Found", //default text to be displayed when no data available
      afterInsertRow: onAfterInsertRow,
      afterDeleteRow: onAfterDeleteRow,
    };
    return (
      <div>
        <BootstrapTable
          data={itemData}
          options={options}
          pagination={true}
          insertRow={true}
          deleteRow={true}
          selectRow={selectRowProp}
          tableStyle={{
            border: "#0c68fc 1px solid",
            backgroundColor: "#61d6f9",
          }}
          cellEdit={cellEditProp}
        >
          <TableHeaderColumn
            isKey
            dataField="ItemId"
            headerAlign="left"
            width="90"
            height="50"
            dataAlign="center"
            dataSort
            display="block"
          >
            Item Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ItemName"
            headerAlign="left"
            width="115"
            height="50"
            dataAlign="center"
            dataSort
            display="block"
            filter={{ type: "TextFilter", delay: 1000 }}
            editable={false}
            customInsertEditor={{ getElement: newNameEditor }}
          >
            Item Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ItemKey"
            headerAlign="left"
            width="110"
            height="50"
            dataAlign="center"
            display="block"
          >
            Item Key
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ItemType"
            headerAlign="left"
            width="110"
            height="50"
            dataAlign="center"
            dataSort
            display="block"
          >
            Item Type
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ItemImage"
            headerAlign="left"
            width="140"
            height="50"
            dataFormat={this.imageFormatter}
            display="block"
            customEditor={{ getElement: createImageEditor }}
            customInsertEditor={{ getElement: newImageEditor }}
          >
            Item Image
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
