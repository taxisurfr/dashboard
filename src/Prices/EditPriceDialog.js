import React, {Component} from 'react'
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';


class EditPriceDialog extends Component {

    render(){
        var options=[{value: 'select'}, {value: 'other'}];
        const contractors=this.props.contractors;
        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Edit Price</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <FormGroup>
                        <FormControl type="text" disable="true"
                                     value={this.props.price.startroute.name}
                        />
                        <FormControl type="text" disable="true"
                                     value={this.props.price.endroute.name}
                        />
                        <FormControl type="text" placeholder="cents"
                                     value={this.props.price.cents}
                                     onChange={(e) => this.props.updatePrice('cents', e)}
                        />
                        {this.props.admin && <FormControl
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
                        </FormControl>}
                    </FormGroup>
                </form>
            </Modal.Body>

            <Modal.Footer>


                <Button bsStyle="primary"
                        onClick={() => this.props.savePrice(this.props.price,false)}>
                    Save price</Button>
                <Button bsStyle="primary"
                        onClick={() => this.props.onAddPriceActive(false)}>
                    Cancel</Button>
            </Modal.Footer>

        </Modal.Dialog>
    }


}
export default EditPriceDialog
