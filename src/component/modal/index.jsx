import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


class MuiModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }

    handleClose = () => {
        const { open } = this.state
        this.setState({ open: !open })
    }

    render() {
        const { open } = this.state
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {this.props.children}
                    </div>
                </Fade>
            </Modal>
        )
    }
}

export default withStyles(styles)(MuiModal);