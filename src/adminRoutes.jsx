import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './theme/layout';
import Dashboard from './pages/dashboard';
import { connect } from 'react-redux';
class AdminRoutes extends React.Component {
    constructor(props) {
        super(props)

        if (!this.props.loggedIn) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/admin' exact component={Dashboard} />
                </Switch>
            </Layout>
        )
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

export default connect(mapState, null)(AdminRoutes);
