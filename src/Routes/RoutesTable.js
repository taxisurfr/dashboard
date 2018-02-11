import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';

import {FormattedDate} from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import {FormattedNumber} from 'react-intl';
import Input from 'muicss/lib/react/input';
import {Field, reduxForm} from 'redux-form';
import {updateRoute} from "./actions";
import AdminAppbar from "../Header/AdminAppbar";
import AddRouteAppbar from "./AddRouteAppbar";
import AddPriceDialog from "../Routes/AddPriceDialog";

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
    </Cell>
);
const LinkCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <div>{'http://taxisurfr.com' + data.getObjectAt(rowIndex)[col]}</div>
    </Cell>
);


const DateCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <FormattedDate
            value={new Date(data.getObjectAt(rowIndex)[col])}
            day="numeric"
            month="long"
            year="numeric"/>
    </Cell>
);

var style = {
    color: 'red'
};
class ButtonCellUpdate extends React.Component {

    render() {
        /*const {data} = this.props;
        const {cent} = this.props;*/
        const {rowIndex} = this.props;
        const {routesList} = this.props;
        const route = routesList.getObjectAt(rowIndex);        //var id = data.getObjectAt(rowIndex)['id'];
        return (
            <Button
                onClick={() => this.props.onClick(route)}
            >Add Price</Button>
        )
    }
};


export const renderInput = ({hint, input, label, value, type, readOnly, meta: {touched, error}}) => (
    <div className="mui--text-left">
        <Input {...input} value={value}/>
    </div>
)

class EditCellX extends React.Component {

    render() {
        const {rowIndex} = this.props;
        const {data} = this.props;
        return (
                <input onChange={(e) => this.props.handleChange(rowIndex, e)}
                       type="text"
                       placeholder={data.getObjectAt(rowIndex)['cents']/100}/>
        )
    }
};

class RoutesTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    };

    handleChange(id,event) {
        const cents = event.target.value;
        //this.setState(this.values[index]={value: event.target.value});
        this.props.dispatch(updateRoute(id,cents*100));
    }




    render() {
        var theme = {
            disabledStyle: {background: 'gray'},
            overStyle: {background: 'red'},
            activeStyle: {background: 'red'},
            pressedStyle: {background: 'magenta', fontWeight: 'bold'},
            overPressedStyle: {background: 'purple', fontWeight: 'bold'}
        }
        var {routesList} = this.props;
        var {admin} = this.props;
        var {onSaveRoute} = this.props;
        var {onAddPrice} = this.props;
        const {centValues} = this.props;
        return (
            <div>
                {this.props.isAddPriceActive && <AddPriceDialog
                    savePrice={this.props.savePrice}
                    updatePrice={this.props.updatePrice}
                    updatePriceFromSelect={this.props.updatePriceFromSelect}
                    onAddPriceActive={this.props.onAddPrice}
                    route={this.props.route}
                    price={this.props.price}
                    locations={this.props.locations}
                    cancelAddPrice={this.props.cancelAddPrice}
                    contractorIdList={this.props.contractorIdList}
                    contractorName={this.props.contractorName}


                />}

            {admin &&<div><AddRouteAppbar
                onAddRouteActive={this.props.onAddRouteActive}
                onAddStartRouteActive={this.props.onAddStartRouteActive}
                saveRoute={this.props.saveRoute}
                saveStartRoute={this.props.saveStartRoute}
                updateRouteId={this.props.updateRouteId}
                updateStartRouteFromSelect={this.props.updateStartRouteFromSelect}
                updateStartRouteFromText={this.props.updateStartRouteFromText}
                updateEndRoute={this.props.updateEndRoute}
                route={this.props.route}
                isAddRouteActive={this.props.isAddRouteActive}
                isAddStartRouteActive={this.props.isAddStartRouteActive}
                locations={this.props.locations}
                created={this.props.created}
            /></div>}
            <form>

                <Table
                    rowHeight={30}
                    groupHeaderHeight={30}
                    headerHeight={30}
                    rowsCount={routesList.getSize()}
                    width={1200}
                    maxHeight={500}
                    {...this.props}>
                    <Column
                        fixed={true}
                        header={<Cell>From</Cell>}
                        cell={<TextCell data={routesList} col="startroute"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>To</Cell>}
                        cell={<TextCell data={routesList} col="endroute"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Link</Cell>}
                        cell={<LinkCell data={routesList} col="description"/>}
                        width={400}
                    />

                    <Column
                        header={<Cell>New Price</Cell>}
                        cell={<ButtonCellUpdate
                            routesList={routesList}
                            onClick={onAddPrice}
                            col="id"
                            status="status"/>}
                        width={150}
                    />
                </Table>
            </form>
            </div>
        );
    }
}

RoutesTable.propTypes = {
    // onTodoClick: PropTypes.func.isRequired
}

const validate = values => {
    const errors = {}

    return errors
}
export default reduxForm({
    form: 'routesTable', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(RoutesTable)