import React, {Component} from 'react'
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import Select from 'react-select';


class EditPriceDialog extends Component {

    render(){
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Add start route</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <FormGroup>
                        <FormControl type="text" disable="true"
                                     value={this.props.price.startroute}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" disable="true"
                                     value={this.props.price.endroute}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="cents"
                                     value={this.props.price.cents}
                                     onChange={(e) => this.props.updatePrice('cents', e)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>

            <Modal.Footer>


                <Button bsStyle="primary"
                        onClick={() => this.props.savePrice(this.props.price)}>
                    Save route</Button>
                <Button bsStyle="primary"
                        onClick={() => this.props.onAddPriceActive(false)}>
                    Cancel</Button>
            </Modal.Footer>

        </Modal.Dialog>
    }


}
export default EditPriceDialog
