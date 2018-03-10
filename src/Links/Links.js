import React, {Component} from 'react'
import {Link} from 'react-router';

class Links extends Component {

    render() {
        return (

            <nav>
                {this.props.validated && <Link className="mui--text-headline" to="finance">Finance</Link>}
                {this.props.validated && <Link className="mui--text-headline" to="prices">Price</Link>}
                {this.props.validated && <Link className="mui--text-headline" to="booking">Booking</Link>}
                {this.props.validated && this.props.admin && <Link className="mui--text-headline" to="contractors">Contractors</Link>}
            </nav>)
    }
}

export default Links;
