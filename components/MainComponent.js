import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent'; // importing, aka, this is a child to the Main component
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Constants from 'expo-constants';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native'; // Platform for conditional code adjustments
// the Main component is a central hub and will hold all of our navigators.
import { createStackNavigator } from 'react-navigation-stack'; // one required argument, RouteConfigs object
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { StatusBar } from 'expo-status-bar';
import SafeAreaView from 'react-native-safe-area-view';
// we have to do some extra shit here to fetch data from the server
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPartners, fetchPromotions } from '../redux/ActionCreators';

// dispatch is for functions, state is for data
// using mapDispatchToProps allows us to access these action creators as props
const mapDispatchToProps = { // these action creators have all been thunked so they can handle async calls
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

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

// stack navigator for the Reservation component, doesn't matter where this goes in the code really since drawerNavigator actually controls the order.

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
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
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

// stack navigator for the Favorites component, doesn't matter where this goes in the code really since drawerNavigator actually controls the order.

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
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
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
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
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => ( // recieves props as it's parameter and will return the view of our customized drawer
    <ScrollView>
        <SafeAreaView /* specific to iPhone X and up, accounts for rounded corners, notch. default drawer navigator layout handles this but because we're replacing this with our own custom drawer we have to add SafeAreaView */ 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}} /* 1/3 of the drawer header view */ >
                    <Image
                        source={require('./images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex: 2}} /* 2/3 of the drawer header view */ >
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} /* show items in the side drawer, passed as props, spread syntax props to pass them, now we need to connect to DrawerNavigator */ /> 
        </SafeAreaView>
    </ScrollView>
);

// drawer navigator, this needs for it's first argument an object that contains the screens that will be in the drawer. pass the Navigator versions of the components so we get the stack navigator versions.

const MainNavigator = createDrawerNavigator(
    {
        Login: { 
            screen: LoginNavigator,
            navigationOptions: { // set these up as objects please
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor} // colors here will change based on active/inactive, and yes we can change the colors if we look up the documentation
                    />
                ) // drawerIcon prop, needs a function, tintColor is a default
            }
        },
        Home: { 
            screen: HomeNavigator,
            navigationOptions: { // set these up as objects please
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
        Reservation: { 
            screen: ReservationNavigator,
            navigationOptions: { 
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor} 
                    />
                ) 
            }
        },
        Favorites: { 
            screen: FavoritesNavigator,
            navigationOptions: { 
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
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
        initialRouteName: 'Home', // what do we want our first screen on load to be?
        drawerBackgroundColor: '#cec8ff',
        contentComponent: CustomDrawerContentComponent // connecting our component to the DrawerNavigator, this tells it to use our custom drawer component to render the content of the side drawer, nice!
    }
);

// now we need to pass all of the above to createAppContainer
// createAppContainer will return a React component, in this case DirectoryNavigator
// note: switching this to MainNavigator now that we're using drawers

const AppNavigator = createAppContainer(MainNavigator);

// moving campsites data to the Directory component since we're adding actual naviagtion, leaving it commented out for personal reference

class Main extends Component {

    // only class components can store state
    // anything OUTSIDE of your component is state, otherwise it's props

    componentDidMount() { // we want to call our action creators AFTER the component has been created, so we'll use the componentDidMount life cycle method here to accomplish that. we're outside of redux at this point. hooks in React mimic this activity too.
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

    }
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
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main); // null first because we don't have state to props to be mapped, which connect expects as the first property