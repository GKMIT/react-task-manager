import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from './controller/dashboard';
import Layout from './theme/layout';
import Login from './controller/login';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />

                    <Route path='/admin/:path?' exact>
                        <Layout>
                            <Switch>
                                <Route path='/admin' exact component={Dashboard} />
                                <Route path='/admin/dashboard' exact component={Dashboard} />
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes;