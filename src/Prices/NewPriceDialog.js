import React, {Component} from 'react'
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import Select from 'react-select';


class EditPriceDialog extends Component {

    render() {
        var options = [{value: 'select'}, {value: 'other'}];
        const contractors = this.props.contractors;
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Add start route</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <FormGroup>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => this.props.updatePrice('startroute', e)}
                        value={null}
                        placeholder={null}>
                        {
                            this.props.locations.map((location) => {
                                return (<option
                                    key={location.id}
                                    value={location.id}>{location.name}
                                </option>)
                            })
                        }
                    </FormControl>

                    <FormControl
                        componentClass="select"
                        onChange={(e) => this.props.updatePrice('endroute', e)}
                        placeholder="endroute">
                        {
                            this.props.locations.map((location) => {
                                return (<option
                                    key={location.id}
                                    value={location.id}>{location.name}
                                </option>)
                            })
                        }
                        </FormControl>

                        <FormControl type="text" placeholder="cents"
                                     value={this.props.price.cents}
                                     onChange={(e) => this.props.updatePrice('cents', e)}
                        />
                        <FormControl
                            componentClass="select"
                            onChange={(e) => this.props.updatePrice('contractor', e)}
                            placeholder="contractor">
                            {
                                contractors.map((contractor, index) => {
                                    return (<option
                                        key={index}
                                        value={contractor.id}>{contractor.name}
                                    </option>)
                                })
                            }
                        </FormControl>
                    </FormGroup>
                </form>
            </Modal.Body>

            < Modal.Footer>
                <Button
                    bsStyle="primary"
                    onClick={() =>
                        this.props.savePrice(this.props.price,true)
                    }>Save price
                </Button>
                <Button bsStyle="primary"
                            onClick={() => this.props.onNewPriceActive(false)}>
                        Cancel
                </Button>
            </Modal.Footer>

        </Modal.Dialog>
    }
}
export default EditPriceDialog
