import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Home extends Component {
    render() {

        const { loading } = this.props.data;

        return (
            <div className="Home" >
                <div className="lander">
                    <h1>Mango</h1>
                    <p>A simple social app</p>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps)(Home);
