import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';

import {FormattedDate} from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import Input from 'muicss/lib/react/input';
import {Field, reduxForm} from 'redux-form';
import AddContractorAppbar from "./AddContractorAppbar";

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
        const {rowIndex} = this.props;
        const {contractorList} = this.props;
        const contractor = contractorList.getObjectAt(rowIndex);
        return (
            <Button
                onClick={() => this.props.onClick(contractor)}
            >Update</Button>
        )
    }
};


export const renderInput = ({hint, input, label, value, type, readOnly, meta: {touched, error}}) => (
    <div className="mui--text-left">
        <Input {...input} value={value}/>
    </div>
)

class ContractorTable extends React.Component {
    render() {
        var theme = {
            disabledStyle: {background: 'gray'},
            overStyle: {background: 'red'},
            activeStyle: {background: 'red'},
            pressedStyle: {background: 'magenta', fontWeight: 'bold'},
            overPressedStyle: {background: 'purple', fontWeight: 'bold'}
        }
        var {contractorsList} = this.props;
        var {admin} = this.props;
        var {onSaveRoute} = this.props;
        const {centValues} = this.props;
        return (
            <div>
            {admin &&<div><AddContractorAppbar
                saveContractor={this.props.saveContractor}
                updateContractor={this.props.updateContractor}
                onAddContractorActive={this.props.onAddContractorActive}
                isAddContractorActive={this.props.isAddContractorActive}
                showNewContractor={this.props.showNewContractor}
                contractor={this.props.contractor}
            /></div>}
            <form>

                <Table
                    rowHeight={30}
                    groupHeaderHeight={30}
                    headerHeight={30}
                    rowsCount={contractorsList.getSize()}
                    width={1500}
                    maxHeight={500}
                    {...this.props}>
                    <Column
                        fixed={true}
                        header={<Cell>Name</Cell>}
                        cell={<TextCell data={contractorsList} col="name"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Email</Cell>}
                        cell={<TextCell data={contractorsList} col="email"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Address1</Cell>}
                        cell={<TextCell data={contractorsList} col="address1"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Address2</Cell>}
                        cell={<TextCell data={contractorsList} col="address2"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Address3</Cell>}
                        cell={<TextCell data={contractorsList} col="address3"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Address4</Cell>}
                        cell={<TextCell data={contractorsList} col="address4"/>}
                        width={200}
                    />
                    <Column
                        header={<Cell>Save</Cell>}
                        cell={<ButtonCellUpdate
                            contractorList={contractorsList}
                            onClick={this.props.modifyContractor}
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
})(ContractorTable)