import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    addNewPriceActive, editPrice, fetchPriceDataIfNeeded, savePrice, updatePrice,
    updatePriceValue
} from './actions';
import PriceTable from "./PricesTable";

class PriceTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.savePrice = this.savePrice.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updatePriceFromSelect = this.updatePriceFromSelect.bind(this);
        this.showEditPrice = this.showEditPrice.bind(this);
        this.onAddPriceActive = this.onAddPriceActive.bind(this);
    }

    showEditPrice(price){
        this.props.dispatch(editPrice(price,true));
    }
   onAddPriceActive(active) {
       this.props.dispatch(editPrice(null,false));
    }

    savePrice(price) {
        var isNewPrice = false;
        this.props.dispatch(savePrice(price,isNewPrice));
        this.props.dispatch(editPrice(price,false));
    }

    modifyPrice(price) {
        this.props.dispatch(updatePriceValue('price', price));
        this.onAddPriceActive(true);
    }

    updatePrice(type, event) {
        if (event) {
            const value = event.target.value;
            this.props.dispatch(updatePriceValue(type, value));
        }
    }

    updatePriceFromSelect(type, event) {
        if (event) {
            const value = event.value;
            this.props.dispatch(updatePriceValue(type, value));
        }
    }


    render() {
        const {pricesDataAvailable} = this.props;
        if (!pricesDataAvailable) this.props.dispatch(fetchPriceDataIfNeeded());
        return (
            <div>
                {!pricesDataAvailable && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                {pricesDataAvailable && <PriceTable
                    admin={this.props.admin}
                    pricesList={this.props.pricesList}
                    locations={this.props.locations}
                    savePrice={this.savePrice}
                    modifyPrice={this.modifyPrice}
                    updatePrice={this.updatePrice}
                    updatePriceFromSelect={this.updatePriceFromSelect}
                    onAddPriceActive={this.onAddPriceActive}
                    showNewPrice={this.showNewPrice}
                    price={this.props.price}
                    isEditPriceActive={this.props.isEditPriceActive}
                    showEditPrice={this.showEditPrice}
                />}
            </div>
        );
    }
}


PriceTableContainer.propTypes = {
    pricesList: PropTypes.object.isRequired,
    pricesDataAvailable: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    const {pricesDataAvailable} = state.pricesData;
    const {pricesList} = state.pricesData;
    const {locations} = state.pricesData;
    const {admin} = state.pricesData;
    const {price} = state.pricesData;
    const {startroute} = state.pricesData;
    const {endroute} = state.pricesData;
    const {cents} = state.pricesData;
    const {isEditPriceActive} = state.pricesData;
    const {id} = state.pricesData;
    const {routeId} = state.pricesData;
    const {contractorId} = state.pricesData;

    return {
        pricesList: pricesList,
        locations: locations,
        admin: admin,
        isEditPriceActive:isEditPriceActive,
        pricesDataAvailable,
        price: {id:id ,
            routeId:routeId ,
            contractorId:contractorId ,
            cents: cents, startroute: startroute,endroute:endroute}
    }
}

    const mapDispatchToProps = (dispatch) => {
        return {
            dispatch: dispatch
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceTableContainer)

