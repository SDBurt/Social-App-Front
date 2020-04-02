import React, { Component } from 'react'
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

// React
import { connect } from 'react-redux';
import { confirmSignupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.InputForm,
    ...theme.Buttons
});

export class ConfirmSignupForm extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            handle: '',
            confirmationCode: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    handleConfirmationSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password,
            handle: this.state.handle
        }

        this.props.confirmSignupUser(userData, this.state.confirmationCode);

        this.setState({
            loading: false
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {

        const {
            classes,
            ui: { loading }
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Confirmation
                    </Typography>
                    <form noValidate className='confirmation-form' onSubmit={this.handleConfirmationSubmit}>
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
    }
}


ConfirmSignupForm.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    confirmSignupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    confirmSignupUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ConfirmSignupForm));