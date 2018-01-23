import React, {Component} from 'react'
import Appbar from 'muicss/lib/react/appbar';
import {Button} from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import AddContractorDialog from "./AddContractorDialog";

class AddContractorAppbar extends Component {
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

        return (
            <Appbar >

                {this.props.isAddContractorActive && <AddContractorDialog
                    saveContractor={this.props.saveContractor}
                    updateContractor={this.props.updateContractor}
                    onAddContractorActive={this.props.onAddContractorActive}
                    contractor={this.props.contractor}
                />}

                <table width="100%" className="mui--appbar-height mui--pull-left">
                    <tbody>
                    <tr style={s1}>
                        <td className="mui--appbar-height mui--pull-left">
                            <h1>Add contractor</h1>
                        </td>
                        <td>
                            <Button
                                onClick={() => this.props.showNewContractor()}>
                                Add Contractor</Button>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </Appbar>
        )
    }
}

export default AddContractorAppbar
