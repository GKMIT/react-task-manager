import React from 'react'
import Container from '@material-ui/core/Container';
import Header from './header'
import Footer from './footer'
import MuiTheme from './theme'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { drawerWidth } from '../helper/constant'

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openMenu: false
        }
    }

    handleOpenMenu = () => {
        const { openMenu } = this.state
        this.setState({
            openMenu: !openMenu
        })
    }

    render() {
        const { classes } = this.props
        const { openMenu } = this.state
        return (
            <React.Fragment>
                <MuiTheme>
                    <div className={classes.root}>
                        <Header openMenu={openMenu} handleOpenMenu={this.handleOpenMenu} />

                        <main
                            className={clsx(classes.content, {
                                [classes.contentShift]: openMenu,
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            <Container>
                                {this.props.children}
                                <Footer />
                            </Container>
                        </main>
                    </div>
                </MuiTheme>
            </React.Fragment>
        )

    }
}

export default withStyles(styles)(Layout);