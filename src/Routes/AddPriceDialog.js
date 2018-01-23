import React, {Component} from 'react'
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import Select from 'react-select';


class AddPriceDialog extends Component {

    render(){
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Add a price for the route</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <FormGroup>
                        <FormControl type="text" disable="true"
                                     value={this.props.route.startroute}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" disable="true"
                                     value={this.props.route.endroute}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="cents"
                                     value={this.props.price.cents}
                                     onChange={(e) => this.props.updatePrice('cents', false, e)}
                        />
                    </FormGroup>
                        <Select
                            name="form-field-name-contractor-name"
                            value="xxxxxxxxxxxx"
/*
                            value={this.props.contractorName}
*/
                            options={this.props.contractorIdList}
                            onChange={(e) => this.props.updatePrice('contractor', true, e)}
                        />
                </form>
            </Modal.Body>

            <Modal.Footer>


                <Button bsStyle="primary"
                        onClick={() => this.props.savePrice(this.props.price)}>
                    Save price</Button>
                <Button bsStyle="primary"
                        onClick={() => this.props.cancelAddPrice()}>
                    Cancel</Button>
            </Modal.Footer>

        </Modal.Dialog>
    }


}
export default AddPriceDialog
