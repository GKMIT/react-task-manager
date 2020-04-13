import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from './controller/dashboard';
import Layout from './theme/layout';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Layout>
                        <Route path='/' component={Dashboard} />
                    </Layout>
                </Switch>
            </Router>
        )
    }
}

export default Routes;