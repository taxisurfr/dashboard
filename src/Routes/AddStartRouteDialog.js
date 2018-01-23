import React, {Component} from 'react'
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';


class AddStartRouteDialog extends Component {

    render(){
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Add start route</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <ControlLabel>Start</ControlLabel>
                    <FormGroup>
                        <FormControl type="text" placeholder="id"
                                     value={this.props.route.routeid}
                                     onChange={this.props.updateRouteId}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="start"
                                     value={this.props.route.startroute}
                                     onChange={this.props.updateStartRouteFromText}
/>
                    </FormGroup>
                </form>
            </Modal.Body>

            <Modal.Footer>


                <Button bsStyle="primary"
                        onClick={() => this.props.saveStartRoute(this.props.route)}>
                    Save route</Button>
                <Button bsStyle="primary"
                        onClick={() => this.props.onAddStartRouteActive(false)}>
                    Cancel</Button>
            </Modal.Footer>

        </Modal.Dialog>
    }


}
export default AddStartRouteDialog
