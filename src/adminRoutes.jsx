import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
            <Route path='/admin/:path?' exact>
                <Layout>
                    <Switch>
                        <Route path='/admin' component={Dashboard} />
                        <Route path='/admin/dashboard' component={Dashboard} />
                    </Switch>
                </Layout>
            </Route>
        )
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

export default withRouter(connect(mapState, null)(AdminRoutes));
