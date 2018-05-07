import React, {Component} from 'react'
import {Link} from 'react-router';
import NavLink from "../Header/NavLink";
import {Button, MenuItem} from "react-bootstrap";

class Links extends Component {

    render() {
        var linkstyle={ paddingLeft: 30,fontSize:24 };
        var buttonstyle={ fontSize:32 };
        return (

            <nav>
                {this.props.validated && <Link style={linkstyle} to="finance">
                    <Button style={buttonstyle} >Finance</Button></Link>}
                {this.props.validated && <Link  style={linkstyle} className="mui--text-headline" to="prices">
                    <Button style={buttonstyle}>Price</Button></Link>}
                {this.props.validated && <Link  style={linkstyle} className="mui--text-headline" to="booking">
                    <Button style={buttonstyle}>Booking</Button></Link>}
                {this.props.validated && this.props.admin && <Link  style={linkstyle} className="mui--text-headline" to="contractors">
                    <Button style={buttonstyle}>Contractors</Button></Link>}
            </nav>)
    }
}

export default Links;
