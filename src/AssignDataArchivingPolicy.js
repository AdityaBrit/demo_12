import React, { Component } from "react";
import IntlMessages from "Helpers/helpers";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Datatable from "Components/Datatable/Datatable";
import { tableButtons, tableColumns, tableOptions } from "./tableInfo";
import AlertMessage from "Components/AlertMessage/AlertMessage";
import TileView from "Components/TileView/TileView";
import { AsyncDataArchivingPolicyForms } from "Components/AsyncComponent/AsyncComponent";

class AssignDataArchivingPolicy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableOptions
    }
  }

  componentDidMount() {
    this.props.fetchAllData();
    this.props.fetchFormFields();
    this.props.toggleListOrForm(true);
  }

  buttonHandler = (type, obj) => {
    const { history } = this.props;
    if (type === "Add") {
      this.props.fetchNewData(history, undefined, obj);
    }
  };

  formHandler = (value) => {
    
    const tableOptions = this.state.tableOptions;
    tableOptions.rowsSelected = []
    this.setState({ tableOptions })
    this.props.toggleListOrForm(value);

  }

  handleEdit = (value, obj) => {
    const { history } = this.props;
    this.props.fetchSelectedData(value, history, undefined, obj);
  };

  handleRowEdit = (value, obj) => {
    const tableOptions = this.state.tableOptions;
    tableOptions.rowsSelected = [obj.rowIndex]
    this.setState({ tableOptions })
    this.handleEdit(value)
  };

  render() {
    const {
      list,
      alertMessage,
      tileViewData,
      tileForm,
      showList,
      updateAlert,
    } = this.props;
    return (
      <div className="wrapper">
        {Object.keys(alertMessage).length != 0 && (
          <AlertMessage data={alertMessage} closeAlert={() => updateAlert({})} />
        )}
        {/* <PageTitleBar
          title={<IntlMessages id="navData.CUSTOMER_LOOKUPS" />}
        /> */}

        <div className="dataTableHold">
          <Datatable
            data={list}
            columns={tableColumns(this.handleRowEdit)}
            options={this.state.tableOptions}
            tableButtons={tableButtons}
            tableButtonHandler={(name, obj) => this.buttonHandler(name, obj)}
            listView={true}
            tileCols={2}
            tileViewData={tileViewData}
            tileForm={tileForm}
            editHandler={(id, obj) => this.handleEdit(id, obj)}
            tileFormCallback={this.props.isTileFormType}
            listOrFormHandler={(value) => this.formHandler(value)}
            addFormOnTile={this.props.addFormOnTile}
            title="navData.ASSIGN_DATA_ARCHIVING_POLICY"
            showList={showList}
          >
            {<AsyncDataArchivingPolicyForms formHandler={(val) => this.formHandler(val)} />}
          </Datatable>
        </div>
      </div>
    );
  }
}

export default AssignDataArchivingPolicy;
