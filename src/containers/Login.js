import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from 'react-redux';
import { loginUser } from "../redux/actions/userActions"

const styles = (theme) => ({
    ...theme.InputForm,
    ...theme.Buttons,
    ...theme.Banner
})

export class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(
            [userData.email, userData.password]
        )
        await loginUser(userData, this.props.history);
    };


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {

        const {
            classes, ui: { loading }
        } = this.props;

        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading || !this.validateForm()}>
                            login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>
                            Don't have an account? Sign up <Link to="'signup">Here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps)(withStyles(styles)(Login));
