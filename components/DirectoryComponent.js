import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux'; // how we get the data from the redux store
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

// you have to pass mapStateToProps to connect in order for this to work
const mapStateToProps = state => { // mapStateToProps lets us pick and choose certain parts of the store so we don't have to load ALL of it
    return {
        campsites: state.campsites
    };
};

// functional component right here, receiving props from it's parent MainComponent.js
// update: changing this to a class component so it can store state data
class Directory extends Component {

// RIP constructor

    // configure the text for headerTitle
    // static sets the method on the class itself rather than the object
    static navigationOptions = {
        title: 'Directory'
    };

    // const, arrow function, for the parameters there's an object that gets passed by default from FlatList, we are going to destructure {item} into the function. similar to map, FlatList is going to iterate through the array we gave in the data prop below. we can access the currrent item that's been iterated over as "item".

    // we need to add a prop to the ListItem component. ListItem contains a built-in onPress prop.
    // update: since this is now a class component, we need to surround everything in a render method.
    render() {
        const { navigate } = this.props.navigation; // each screen component is provided with the navigation prop automatically
        const renderDirectoryItem = ({item}) => {
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })} // two arguments: first, the name of the screen to navigate to (CampsiteInfo), second optional adds extra parameters to the route, in this case the campsite id that was pressed. this will be passed to CampsiteInfo component via campsiteId.
                        imageSrc={{uri: baseUrl + item.image}}
                        // onPress={() => props.onPress(item.id)} // when the ListItem component is pressed on a mobile device, whatever function we put in here will fire. we're going to trigger our onCampsiteSelect event handler. don't forget, we named our other prop "onPress" as well, so that's what's being called here. this is going to update the selectedCampsite property in Main.
                        // leftAvatar={{ source: require('./images/react-lake.jpg')}} // requires an object, so we need to use two sets of curly braces: the first set to embed the JavaScript inside of JSX, the second set to define the object literal. leftAvatar takes a property of source, and a property value is a function called "require" provided by Node.js. we will give it the location of an image we want to use. normally this would be a different image for each item but for our purposes it's the same thing.
                    />
                </Animatable.View>
            );
        };

        // returning the FlatList component from react-native
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList // we need to pass some props to this component. note: now we are passing this.state since this component holds the state instead of Main.
                data={this.props.campsites.campsites} // where is the data coming from? expecting an array - let's plug in the campsites array we passed from Main
                renderItem={renderDirectoryItem} // how to render each item in the list? let's make a callback function for that above
                keyExtractor={item => item.id.toString()} // when we render lists from arrays we need a unique key. every item in the campsites array has a unique id we can use. telling key extractor to grab that id from each item. keyExtractor expects a string so be sure to convert using toString.
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);