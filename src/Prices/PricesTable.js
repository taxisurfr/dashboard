import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';

import {FormattedDate} from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import Input from 'muicss/lib/react/input';
import {Field, reduxForm} from 'redux-form';
import AddPriceAppbar from "./AddPriceAppbar";
import EditPriceDialog from "./EditPriceDialog";

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
    </Cell>
);
const StartTextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col].name}
    </Cell>
);

const EndTextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col].name}
    </Cell>
);
const ContractorCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col].name}
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
        const {rowIndex} = this.props;
        const {pricesList} = this.props;
        const {contractors} = this.props;
        const price = pricesList.getObjectAt(rowIndex);
        return (
            <Button
                onClick={() => this.props.onClick(price)}
            >Edit Price</Button>
        )
    }
};


export const renderInput = ({hint, input, label, value, type, readOnly, meta: {touched, error}}) => (
    <div className="mui--text-left">
        <Input {...input} value={value}/>
    </div>
)

class PriceTable extends React.Component {
    render() {
        var theme = {
            disabledStyle: {background: 'gray'},
            overStyle: {background: 'red'},
            activeStyle: {background: 'red'},
            pressedStyle: {background: 'magenta', fontWeight: 'bold'},
            overPressedStyle: {background: 'purple', fontWeight: 'bold'}
        }
        var {pricesList} = this.props;
        var {admin} = this.props;
        var {onSaveRoute} = this.props;
        const {centValues} = this.props;

        const p = this.props.pricesList === null ? null : this.props.pricesList.getObjectAt(0);
        return (
            <div>

                {this.props.isEditPriceActive && <EditPriceDialog
                    savePrice={this.props.savePrice}
                    updatePrice={this.props.updatePrice}
                    updatePriceFromSelect={this.props.updatePriceFromSelect}
                    onAddPriceActive={this.props.onAddPriceActive}
                    price={this.props.price}
                    contractors={this.props.contractors}
                    locations={this.props.locations}
                />}

                {admin &&<div><AddPriceAppbar
                    savePrice={this.props.savePrice}
                    updatePrice={this.props.updatePrice}
                    updatePriceFromSelect={this.props.updatePriceFromSelect}
                    onAddPriceActive={this.props.onAddPriceActive}
                    isAddPriceActive={this.props.isAddPriceActive}
                    showNewPrice={this.props.showNewPrice}
                    price={this.props.price}
                    locations={this.props.locations}
                    contractors={this.props.contractors}
                    isEditPriceActive={this.props.isEditPriceActive}
                /></div>}
                <form>

                <Table
                    rowHeight={30}
                    groupHeaderHeight={30}
                    headerHeight={30}
                    rowsCount={pricesList.getSize()}
                    width={1500}
                    maxHeight={500}
                    {...this.props}>
                    <Column
                        fixed={true}
                        header={<Cell>Start</Cell>}
                        cell={<StartTextCell data={pricesList} col="startroute"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>End</Cell>}
                        cell={<EndTextCell data={pricesList} col="endroute"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Price</Cell>}
                        cell={<TextCell data={pricesList} col="cents"/>}
                        width={200}
                    />
                    {admin && <Column
                        fixed={true}
                        header={<Cell>Contractor</Cell>}
                        cell={<ContractorCell data={pricesList} col="contractor"/>}
                        width={200}
                    />}
                    <Column
                        header={<Cell>Save</Cell>}
                        cell={<ButtonCellUpdate
                            pricesList={pricesList}
                            contractors={this.contractors}
                            onClick={this.props.showEditPrice}
                            col="id"
                            status="status"/>}
                        width={100}
                    />
                </Table>
            </form>
            </div>
        );
    }
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
})(PriceTable)