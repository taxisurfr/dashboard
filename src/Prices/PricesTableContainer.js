import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    addNewPriceActive, editPrice, newPrice, fetchPriceDataIfNeeded, savePrice, updatePrice,
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
        this.showNewPrice = this.showNewPrice.bind(this);
        this.onAddPriceActive = this.onAddPriceActive.bind(this);
        this.onNewPriceActive = this.onNewPriceActive.bind(this);
    }

    showEditPrice(price){
        this.props.dispatch(editPrice(price,true));
    }

    showNewPrice(price){
        this.props.dispatch(newPrice(price,true));
    }

    onAddPriceActive(active) {
       this.props.dispatch(editPrice(null,false));
    }

    onNewPriceActive(active) {
        this.props.dispatch(newPrice(null,false));
    }

    savePrice(price,isNewPrice) {
        this.props.dispatch(savePrice(price,isNewPrice));
        this.props.dispatch(editPrice(price,false));
    }

    modifyPrice(price) {
        this.props.dispatch(updatePriceValue('price', price));
        this.onAddPriceActive(true);
    }

    updatePrice(type, event) {
        if (event) {
            var value = event.target.value;
            if ('contractor'===type){
                value = {id:value};
            }
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
                    onNewPriceActive={this.onNewPriceActive}
                    showNewPrice={this.showNewPrice}
                    price={this.props.price}
                    cents={this.props.cents}
                    isEditPriceActive={this.props.isEditPriceActive}
                    isNewPriceActive={this.props.isNewPriceActive}
                    contractors={this.props.contractors}
                    showEditPrice={this.showEditPrice}
                />}
            </div>
        );
    }
}


PriceTableContainer.propTypes = {
    pricesDataAvailable: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    const {pricesDataAvailable} = state.pricesData;
    const {pricesList} = state.pricesData;
    const {locations} = state.pricesData;
    const {admin} = state.pricesData;
    const {price} = state.pricesData;
    const {isEditPriceActive} = state.pricesData;
    const {isNewPriceActive} = state.pricesData;
    const {id} = state.pricesData;
    const {contractorId} = state.financeData;
    const {contractors} = state.pricesData;
    const cents = state.pricesData.price ? state.pricesData.price.cents : null;

    return {
        pricesList: pricesList,
        locations: locations,
        admin: admin,
        isEditPriceActive:isEditPriceActive,
        isNewPriceActive:isNewPriceActive,
        pricesDataAvailable,
        contractors,
        contractorId,
        price,
        cents
    }
}

    const mapDispatchToProps = (dispatch) => {
        return {
            dispatch: dispatch
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceTableContainer)

