import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { appTitle } from '../helper/constant';

const styles = (theme) => ({
    footer: {
        flexGrow: 1,
    },
});


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    showCurrentYear = () => {
        return new Date().getFullYear();
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment className={classes.footer}>
                <Typography>All rights reserved {appTitle} &copy; {this.showCurrentYear()}</Typography>
            </React.Fragment>
        )

    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);