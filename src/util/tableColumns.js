import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import {FormattedNumber} from 'react-intl';
import Input from 'muicss/lib/react/input';
import {Field, reduxForm} from 'redux-form';

export const ButtonCell = ({rowIndex, data, status, col, ...props}) => (
    <Button disabled={data.getObjectAt(rowIndex)[status] !== 'PAID'}
            onClick={() => props.onClick(data.getObjectAt(rowIndex)[col])}
    >Cancel</Button>
);


export const AmtCell = ({rowIndex, data, colAmt, ...props}) => (
    <Cell {...props}>
        <div className="mui--text-right">
            <FormattedNumber
                value={data.getObjectAt(rowIndex)[colAmt] / 100}
                style="currency"
                currency="USD"/>
        </div>
    </Cell>
);

var noborder = {
    border: 'none'
}




