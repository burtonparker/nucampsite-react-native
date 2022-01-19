import React, { Component } from 'react';
import Directory from './DirectoryComponent'; // importing, aka, this is a child to the Main component
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native'; // Platform for conditional code adjustments
// the Main component is a central hub and will hold all of our navigators.
import { createStackNavigator } from 'react-navigation-stack'; // one required argument, RouteConfigs object
import { createAppContainer } from 'react-navigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

// set which components will be available to the stack
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    // note: this second argument is optional
    {
        initialRouteName: 'Directory', // default to showing the Directory component
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

// now we need to pass all of the above to createAppContainer
// createAppContainer will return a React component, in this case DirectoryNavigator

const AppNavigator = createAppContainer(DirectoryNavigator);

// moving campsites data to the Directory component since we're adding actual naviagtion, leaving it commented out for personal reference

class Main extends Component {
/*     constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null // reserving a space in local state where we keep track of which campsite has been selected, so we know which one to tell the CampsiteInfo component to display. initialize a selectedCampsite property to null.
        };
    } */

// we need an event handler to update the selectedCampsite property in our state when a campsite is selected

    // event handler right here folks
    // removing the event handler stuff since we're using real navigation now, preserved in comments for reference
/*     onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});  // update the state, state is being managed by the React Native component. this is similar to how we handled state prior to introducing Redux.
    } */

    render() { // pass the entire campsites array. we can't return two components at the top level, only one. in this case we wrap them in a View component as a work around. NOTE: check commit history, this was removed after implementing AppNavigator but like above I'm trying to preserve the steps for reference for future projects/knowledge.
        return (
            <View 
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                }}
            >
                <AppNavigator />
            </View>
        );
    }
}

// end goal is to render the CampsiteInfo component below the directory whenever one of the directory items is clicked.



export default Main;