import {FormattedNumber} from 'react-intl';
import React from 'react'
import {FormattedDate} from 'react-intl';

import {Table, Column, Cell} from 'fixed-data-table';
import '../fixed-data-table.css';

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
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

const AmtCell = ({rowIndex, data, colAmt, ...props}) => (
    <Cell {...props}>
        <div className="mui--text-right">
            <FormattedNumber
                value={data.getObjectAt(rowIndex)[colAmt]}/>
        </div>
    </Cell>
);
class PaymentTable extends React.Component {
    render() {
        var {paymentList} = this.props;
        var {onCancel} = this.props;
        return (
            <div>
                <row>
                    <h1>Payments</h1>
                </row>

                <Table
                    rowHeight={30}
                    groupHeaderHeight={30}
                    headerHeight={30}
                    rowsCount={paymentList.getSize()}
                    width={1000}
                    maxHeight={500}
                    {...this.props}>
                    <Column
                        fixed={true}
                        header={<Cell>Booking</Cell>}
                        cell={<TextCell data={paymentList} col="name"/>}
                        width={200}
                    />
                    <Column
                        fixed={true}
                        header={<Cell>Date paid</Cell>}
                        cell={<DateCell data={paymentList} col="datetime"/>}
                        width={200}
                    />
                    <Column
                        align='right'
                        fixed={true}
                        header={<Cell>Amount LKR</Cell>}
                        cell={<AmtCell data={paymentList} colAmt="amount"/>}
                        width={150}
                    />
                </Table>
            </div>
        );
    }
}

export default PaymentTable
