import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from './controller/dashboard';
import Layout from './theme/layout';

class AdminRoutes extends React.Component {
    render() {
        return (
            <Route path='/admin/:path?' exact>
                <Layout>
                    <Switch>
                        <Route path='/admin' exact component={Dashboard} />
                        <Route path='/admin/dashboard' exact component={Dashboard} />
                    </Switch>
                </Layout>
            </Route>
        )
    }
}

export default AdminRoutes;