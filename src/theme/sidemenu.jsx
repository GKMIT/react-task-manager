import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import { connect } from 'react-redux';
import { userActions } from '../_actions';

class SideMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openMenu: false,
            anchorEl: null
        }
    }

    setAnchorEl = (anchorEl) => {
        this.setState({
            anchorEl: anchorEl
        })
    }

    handleOpenMenu = (event) => {
        this.setAnchorEl(event.currentTarget);

        const { openMenu } = this.state
        this.setState({
            openMenu: !openMenu
        })
    }


    handleLogout = () => {
        this.props.logout();
        const { openMenu } = this.state
        this.setState({
            openMenu: !openMenu
        })
    }

    render() {
        const { openMenu, anchorEl } = this.state
        return (
            <React.Fragment>
                <IconButton aria-controls="sideMenu" aria-haspopup="true" edge="end" color="inherit" onClick={this.handleOpenMenu}>
                    <MoreIcon />
                </IconButton>

                <Menu
                    id="sideMenu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openMenu}
                    onClose={this.handleOpenMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={this.handleOpenMenu}>Profile</MenuItem>
                    <MenuItem onClick={this.handleOpenMenu}>My account</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
            </React.Fragment>
        )

    }
}


function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    logout: userActions.logout,
};

export default (connect(mapState, actionCreators)(SideMenu));
