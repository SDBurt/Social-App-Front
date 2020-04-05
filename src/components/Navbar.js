import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"

// MUI
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Components
import { logoutUser } from '../redux/actions/userActions';
import NewPost from '../components/NewPost';
import MyButton from '../util/MyButton'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Logo from '../images/mango1.png'

const styles = (theme) => ({
    ...theme.InputForm,
    ...theme.Buttons,
    ...theme.Banner,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appbar: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
})

class Navbar extends Component {

    handleLogout = (event) => {
        this.props.logoutUser();
    }

    render() {

        const {
            classes,
            ui: { loading },
            user: { authenticated }
        } = this.props;

        return (
            <AppBar className={classes.appbar}>
                <Toolbar position="static">
                    <img src={Logo} height='50' />
                    <Typography variant="h6" className={classes.title}>
                        Mango
                    </Typography>

                    {

                        !loading
                            ? <Fragment>
                                <Link to="/">
                                    <MyButton tip="Home">
                                        <HomeIcon />
                                    </MyButton>
                                </Link>
                                {authenticated
                                    ? <Fragment>
                                        <NewPost />
                                        <MyButton tip="Logout" onClick={this.handleLogout}>
                                            <ExitToAppIcon />
                                        </MyButton>
                                    </Fragment>
                                    : <Fragment>
                                        <Button color="inherit" component={Link} to="/login">Login</Button>
                                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                    </Fragment>
                                }</Fragment>
                            : <Fragment></Fragment>
                    }
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
