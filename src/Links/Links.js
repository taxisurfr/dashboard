import React, {Component} from 'react'
import {Link} from 'react-router';
import {Label} from "react-bootstrap";

class Links extends Component {

    render() {
        return (

            <nav>
                <Link className="mui--text-headline" to="finance">Finance</Link>
                {this.props.admin && <Link className="mui--text-headline" to="prices">Price</Link>}
                <Link className="mui--text-headline" to="booking">Booking</Link>
                {this.props.admin && <Link className="mui--text-headline" to="routes">Routes</Link>}
                {this.props.admin && <Link className="mui--text-headline" to="contractors">Contractors</Link>}
            </nav>)
    }
}

export default Links;
