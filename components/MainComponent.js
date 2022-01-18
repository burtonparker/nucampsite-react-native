import React, { Component } from 'react';
import Directory from './DirectoryComponent'; // importing, aka, this is a child to the Main component
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    render() { // pass the entire campsites array
        return <Directory campsites={this.state.campsites} />;
    }
}

export default Main;