import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent'; // importing, aka, this is a child to the Main component
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Constants from 'expo-constants';
import { View, Platform, StyleSheet } from 'react-native'; // Platform for conditional code adjustments
// the Main component is a central hub and will hold all of our navigators.
import { createStackNavigator } from 'react-navigation-stack'; // one required argument, RouteConfigs object
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { StatusBar } from 'expo-status-bar';

// set which components will be available to the stack
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { 
            screen: Directory,
            navigationOptions:  ({navigation}) => ({ // wrap this OBJECT in a set of parentheses so that the arrow function doesn't get confused. otherwise it might think that's the beginning curly brace for a FUNCTION BODY, but it's actually the beginning curly brace for an OBJECT LITERAL.
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                /> // gonna destructure the navigation prop in the parameter list so we can use it's built in toggleDrawer method. also note that we can make separate edits to CampsiteInfo screen.
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    // note: this second argument is optional
    {
        initialRouteName: 'Directory', // default to showing the Directory component
        defaultNavigationOptions: { // note: these styles apply to BOTH screens above, so we're going to want to add additional navigationOptions to JUST the Directory.
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

// stack navigator for the Home component

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    // note: this second argument is optional
    {
        // initialRoute is not needed since we only have one screen to deal with
        defaultNavigationOptions: ({navigation}) => ({ // since we only have one screen here we can just use defaultNavigationOptions and not have to do the other navigationOptions fiddling we did with Directory above. that being said, we DO have do destructure navigation into here though.
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

// stack navigator for the About component

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    // note: this second argument is optional
    {
        // initialRoute is not needed since we only have one screen to deal with
        defaultNavigationOptions: ({navigation}) => ({ // since we only have one screen here we can just use defaultNavigationOptions and not have to do the other navigationOptions fiddling we did with Directory above. that being said, we DO have do destructure navigation into here though.
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

// stack navigator for the Contact component

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    // note: this second argument is optional
    {
        // initialRoute is not needed since we only have one screen to deal with
        defaultNavigationOptions: ({navigation}) => ({ // since we only have one screen here we can just use defaultNavigationOptions and not have to do the other navigationOptions fiddling we did with Directory above. that being said, we DO have do destructure navigation into here though.
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

// drawer navigator, this needs for it's first argument an object that contains the screens that will be in the drawer. pass the Navigator versions of the components so we get the stack navigator versions.

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: { // set these up as objects
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor} // colors here will change based on active/inactive, and yes we can change the colors if we look up the documentation
                    />
                ) // drawerIcon prop, needs a function, tintColor is a default
            }
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: { 
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor} 
                    />
                ) 
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: { 
                drawerLabel: 'About Us', // override "About" label
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor} 
                    />
                ) 
            }
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: { 
                drawerLabel: 'Contact Us', // override "Contact" label
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor} 
                    />
                ) 
            }
        }
    },
    // as always, this second argument is optional but the first is required
    {
        drawerBackgroundColor: '#cec8ff'
    }
);

// now we need to pass all of the above to createAppContainer
// createAppContainer will return a React component, in this case DirectoryNavigator
// note: switching this to MainNavigator now that we're using drawers

const AppNavigator = createAppContainer(MainNavigator);

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

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;