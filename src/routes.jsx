import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/login';
import AdminRoutes from './adminRoutes';


class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <AdminRoutes />
                </Switch>
            </Router>
        )
    }
}

export default Routes;