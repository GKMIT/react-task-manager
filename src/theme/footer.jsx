import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({    
    footer: {
        flexGrow: 1,
    },
});


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment className={classes.footer}>
                <Typography>Footer</Typography>
            </React.Fragment>
        )

    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);