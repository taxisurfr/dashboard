import React, {Component} from 'react'
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';


class AddContractorDialog extends Component {

    render(){
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Add start route</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <ControlLabel>Start</ControlLabel>
                    <FormGroup>
                        <FormControl type="text" placeholder="name"
                                     value={this.props.contractor.name}
                                     onChange={(e) => this.props.updateContractor('name', e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="email"
                                     value={this.props.contractor.email}
                                     onChange={(e) => this.props.updateContractor('email', e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="address1"
                                     value={this.props.contractor.address1}
                                     onChange={(e) => this.props.updateContractor('address1', e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="address2"
                                     value={this.props.contractor.address2}
                                     onChange={(e) => this.props.updateContractor('address2', e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="address3"
                                     value={this.props.contractor.address3}
                                     onChange={(e) => this.props.updateContractor('address3', e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" placeholder="address4"
                                     value={this.props.contractor.address4}
                                     onChange={(e) => this.props.updateContractor('address4', e)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>

            <Modal.Footer>


                <Button bsStyle="primary"
                        onClick={() => this.props.saveContractor(this.props.contractor)}>
                    Save contractor</Button>
                <Button bsStyle="primary"
                        onClick={() => this.props.onAddContractorActive(false)}>
                    Cancel</Button>
            </Modal.Footer>

        </Modal.Dialog>
    }


}
export default AddContractorDialog
