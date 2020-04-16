import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './theme/layout';
import { connect } from 'react-redux';

import Dashboard from './pages/dashboard';
import UserList from './pages/users';
import UserForm from './pages/users/form';

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
                    <Route path='/users' component={UserList} />
                    <Route path='/user-form/:id' component={UserForm} />
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
