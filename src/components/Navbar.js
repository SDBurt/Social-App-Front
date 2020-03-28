import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"

// MUI
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// React
import { logoutUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.InputForm,
    ...theme.Buttons,
    ...theme.Banner
})

class Navbar extends Component {

    handleLogout = (event) => {
        this.props.logoutUser();
    }

    render() {

        const {
            ui: { loading },
            user: { authenticated }
        } = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        {authenticated
                            ? <Fragment>
                                <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                            </Fragment>
                            : <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        }

                    </Fragment>
                </Toolbar>
            </AppBar>
        )
    }
}



Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));
