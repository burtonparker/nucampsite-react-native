import React, { Component } from 'react';
import Directory from './DirectoryComponent'; // importing, aka, this is a child to the Main component
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null // reserving a space in local state where we keep track of which campsite has been selected, so we know which one to tell the CampsiteInfo component to display. initialize a selectedCampsite property to null.
        };
    }

// we need an event handler to update the selectedCampsite property in our state when a campsite is selected

    // event handler right here folks
    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});  // update the state, state is being managed by the React Native component. this is similar to how we handled state prior to introducing Redux.
    }

    render() { // pass the entire campsites array. we can't return two components at the top level, only one. in this case we wrap them in a View component as a work around.
        return (
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)} // arrow function that takes campsiteId as a parameter and contains onCampsiteSelect event handler. we aren't calling the this.onCampsiteSelect method, we're instead passing the method to the Directory component so that it's available to be triggered from there.
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} // passing campsite as a prop to CampsiteInfo, passing an entire campsite object as the content of the prop itself (name, image, description, etc.). selectedCampsite only contains the id, therefore... we can take the entire array of campsite objects from the state and filter them and look for a matching campsite id. remember: filter ALWAYS returns an array so we grab the first item in the array at the index of 0.
                />
            </View>
        );
    }
}

// end goal is to render the CampsiteInfo component below the directory whenever one of the directory items is clicked.



export default Main;