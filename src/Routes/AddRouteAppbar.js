import React, {Component} from 'react'
import Appbar from 'muicss/lib/react/appbar';
import {Modal, Button, ControlLabel} from 'react-bootstrap';
import Select from 'react-select';
import AddStartRouteDialog from './AddStartRouteDialog';

import 'react-select/dist/react-select.css';

class AdminAppbar extends Component {

    render() {
        const s1 = {verticalAlign: 'middle'};
        var {isAddRouteActive} = this.props;

        return (
            <Appbar >
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
                                onChange={this.props.updateStartRouteFromSelect}
                            />
                            <Select
                                name="form-field-name-endroute"
                                value={this.props.route.endroute}
                                options={this.props.locations}
                                onChange={this.props.updateEndRoute}
                            />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>

                        <Button bsStyle="primary"
                                onClick={() => this.props.saveRoute(this.props.route)}>
                            Save route</Button>
                        <Button bsStyle="primary"
                                onClick={() => this.props.onAddRouteActive(false)}>
                            Cancel</Button>
                    </Modal.Footer>

                </Modal.Dialog>}

                {this.props.isAddStartRouteActive && <AddStartRouteDialog
                    saveStartRoute={this.props.saveStartRoute}
                    updateRouteId={this.props.updateRouteId}
                    updateStartRouteFromText={this.props.updateStartRouteFromText}
                    onAddStartRouteActive={this.props.onAddStartRouteActive}
                    route={this.props.route}
                />}

                <table width="100%" className="mui--appbar-height mui--pull-left">
                    <tbody>
                    <tr style={s1}>
                        <td className="mui--appbar-height mui--pull-left">
                            <h1>Add route</h1>
                        </td>
                        <td>
                            <Button
                                onClick={() => this.props.onAddRouteActive(true)}>
                                Add Route</Button>
                            <Button
                                onClick={() => this.props.onAddStartRouteActive(true)}>
                                Add Start</Button>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </Appbar>
        )
    }
}

export default AdminAppbar
