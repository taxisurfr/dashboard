import React, {Component} from 'react'
import Appbar from 'muicss/lib/react/appbar';
import {Modal, Button, ControlLabel, FormControl} from 'react-bootstrap';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

class AdminAppbar extends Component {
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
        const clrText = {color: 'black'};
        const clr = {backgroundColor: '#66ff99'};

        const s1 = {verticalAlign: 'middle'};

        var {addRouteActive} = this.props;
        var {isAddRouteActive} = this.props;

        var options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        return (
            <Appbar style={clr}>
                {isAddRouteActive && <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add transfer</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <ControlLabel>Start</ControlLabel>
                            <Select
                                name="form-field-name-startroute"
                                value={this.props.route.startroute}
                                options={this.props.locations}
                                onChange={this.props.updateStartRoute}
                            />
                            <Select
                                name="form-field-name-endroute"
                                value={this.props.route.endroute}
                                options={this.props.locations}
                                onChange={this.props.updateEndRoute}
                            />
                           {/* <Select
                                id="startroute"
                                values={this.props.locations}
                                onChange={this.props.updateRoute}
                            />
                            <ControlLabel>End</ControlLabel>
                            <FormControl
                                id="endroute"
                                type="text"
                                value={this.props.route.endroute}
                                placeholder="destination"
                                onChange={this.props.updateRoute}
                            />*/}
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary"
                                onClick={() => this.props.saveRoute(this.props.route)}>
                            >Save route</Button>
                    </Modal.Footer>

                </Modal.Dialog>}

                <table width="100%" className="mui--appbar-height mui--pull-left">
                    <tbody>
                    <tr style={s1}>
                        <td className="mui--appbar-height mui--pull-left">
                            <h1>Add route</h1>
                        </td>
                        <td>
                            <Button
                                onClick={() => this.props.addRouteActive(true)}>
                                Add Route</Button>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </Appbar>
        )
    }
}

export default AdminAppbar
