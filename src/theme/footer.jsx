import React from 'react';
import Copyright from '../component/copyright';

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Copyright />
            </React.Fragment>
        )

    }
}

export default Footer;