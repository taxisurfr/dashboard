import React, {Component} from 'react'
import Appbar from 'muicss/lib/react/appbar';
import {Button} from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import EditPriceDialog from "./EditPriceDialog";

class AddPriceAppbar extends Component {
    constructor(props) {
        super(props);
        this.logChange = this.logChange.bind(this);
    }


    logout = (response) => {
        console.log(response);
    }

    logChange(val) {
        console.log('Selected: ', val);
    }

    render() {

        const s1 = {verticalAlign: 'middle'};
        var {admin} = this.props;

        return (
            <Appbar >

                <table width="100%" className="mui--appbar-height mui--pull-left">
                    <tbody>
                    <tr style={s1}>
                        <td className="mui--appbar-height mui--pull-left">
                            <h1>Edit price</h1>
                        </td>
                        <td>
                            <Button
                                onClick={() => this.props.showNewPrice()}>
                                Add Price</Button>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </Appbar>
        )
    }
}


export default AddPriceAppbar
