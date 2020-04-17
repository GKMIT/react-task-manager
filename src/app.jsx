import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/login';
import AdminRoutes from './adminRoutes';
import { connect } from 'react-redux';
import { loaderActions } from './_actions';

import Loader from './component/alert/loader';
class App extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.showLoader();
    }

    componentDidMount() {
        this.props.hideLoader();
    }

    render() {
        return (
            <React.Fragment>

                <Loader open={this.props.loader} />

                <Router>
                    <Switch>
                        <Route path='/' exact component={Login} />
                        <AdminRoutes />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}


function mapState(state) {
    const { loader } = state;
    return { loader };
}

const actionCreators = {
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
};

export default (connect(mapState, actionCreators)(App));
