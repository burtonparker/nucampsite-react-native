import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

// functional component right here, receiving props from it's parent MainComponent.js
function Directory(props) {

    // const, arrow function, for the parameters there's an object that gets passed by default from FlatList, we are going to destructure {item} into the function. similar to map, FlatList is going to iterate through the array we gave in the data prop below. we can access the currrent item that's been iterated over as "item".

    // we need to add a prop to the ListItem component. ListItem contains a built-in onPress prop.
    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)} // when the ListItem component is pressed on a mobile device, whatever function we put in here will fire. we're going to trigger our onCampsiteSelect event handler. don't forget, we named our other prop "onPress" as well, so that's what's being called here. this is going to update the selectedCampsite property in Main.
                leftAvatar={{ source: require('./images/react-lake.jpg')}} // requires an object, so we need to use two sets of curly braces: the first set to embed the JavaScript inside of JSX, the second set to define the object literal. leftAvatar takes a property of source, and a property value is a function called "require" provided by Node.js. we will give it the location of an image we want to use. normally this would be a different image for each item but for our purposes it's the same thing.
            />
        );
    };

    // returning the FlatList component from react-native
    return (
        <FlatList // we need to pass some props to this component
            data={props.campsites} // where is the data coming from? expecting an array - let's plug in the campsites array we passed from Main
            renderItem={renderDirectoryItem} // how to render each item in the list? let's make a callback function for that above
            keyExtractor={item => item.id.toString()} // when we render lists from arrays we need a unique key. every item in the campsites array has a unique id we can use. telling key extractor to grab that id from each item. keyExtractor expects a string so be sure to convert using toString.
        />
    );
}

export default Directory;