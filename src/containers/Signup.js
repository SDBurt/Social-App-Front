import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { validateSignupData, validateConfirmationSignupData } from '../util/validators'

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser, confirmSignupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.InputForm,
    ...theme.Buttons,
    ...theme.Banner,
    ...theme.Errors
});

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
            confirmationCode: '',
            userData: {}
        };

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        this.setState({ errors: validateSignupData(newUserData) });
        if (!this.state.errors) {
            this.props.signupUser(newUserData);
        }

    };

    handleConfirmationSubmit = (event) => {
        event.preventDefault();
        this.setState({ errors: validateConfirmationSignupData(this.state) });
        if (!this.state.errors) {
            this.props.confirmSignupUser(this.state.userData, this.state.confirmationCode);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {

        const {
            classes,
            ui: { loading },
            user: { authenticating }
        } = this.props;
        const { errors } = this.state;

        const renderConfirmationForm = () => {
            return (
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Confirmation
                    </Typography>
                        <form noValidate onSubmit={this.handleConfirmationSubmit}>
                            <TextField
                                id="confirmationCode"
                                name="confirmationCode"
                                label="Confirmation Code"
                                className={classes.textField}
                                helperText={errors.confirmationCode}
                                error={errors.confirmationCode ? true : false}
                                value={this.state.confirmationCode}
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
                                disabled={loading}
                            >
                                Verify
                  {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                            </Button>
                            <br />
                        </form>
                    </Grid>
                    <Grid item sm />
                </Grid>
            )
        };

        const renderSignupForm = () => {
            return (
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <Typography variant="h2" className={classes.pageTitle}>
                            SignUp
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                className={classes.textField}
                                helperText={errors.email}
                                error={errors.email ? true : false}
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
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                className={classes.textField}
                                helperText={errors.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="handle"
                                name="handle"
                                type="text"
                                label="Handle"
                                className={classes.textField}
                                helperText={errors.handle}
                                error={errors.handle ? true : false}
                                value={this.state.handle}
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
                                disabled={loading}
                            >
                                SignUp
                  {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                            </Button>
                            <br />
                            <small>
                                Already have an account ? Login <Link to="/login">here</Link>
                            </small>
                        </form>
                    </Grid>
                    <Grid item sm />
                </Grid>
            )
        };

        return (
            <div className="Signup">
                {!authenticating ? renderSignupForm() : renderConfirmationForm()}
            </div>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    confirmSignupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    signupUser, confirmSignupUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Signup));