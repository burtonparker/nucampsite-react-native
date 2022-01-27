import React, { Component } from 'react';
// FIX 1: It's best practice to combine imports from the same library so your code is easier for other devs to follow 
// OLD CODE:
/*
import { View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
*/
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
// END FIX 1

// NOTE: We do not need any of the navigator imports in this component file.
/*
import { createStackNavigator } from 'react-navigation-stack'; // one required argument, RouteConfigs object
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
*/
import { connect } from 'react-redux'; // how we get the data from the redux store
import { baseUrl } from '../shared/baseUrl';

// you have to pass mapStateToProps to connect in order for this to work
const mapStateToProps = state => { // mapStateToProps lets us pick and choose certain parts of the store so we don't have to load ALL of it
    return {
        partners: state.partners
    };
};

function Mission() { // gonna pass this an item we destructure from the props object

    return(
        <Card title="Our Mission">
            <Text style={{margin: 10}}>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}

class About extends Component {

// see commit history, we removed a constructor here, and so with it, local state creation.

    static navigationOptions = {
        title: 'About'
    }

    render() {

        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        }

        return (
            <ScrollView>
                <Mission />
                <Card 
                    title="Community Partners">
                        <FlatList 
                            data={this.props.partners.partners} // the first partners refers to the entire part of the state that handles the partners data, including isLoading and error message properties, along with the partners array. the second partners, is what actually refers to the partners data array.
                            renderItem={renderPartner}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About); // here's how we actally connect all that good good data.