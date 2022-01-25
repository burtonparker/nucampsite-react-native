import React, { Component } from 'react'; // reminder, we need component when we need to deal with state data
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';

function RenderCampsite({campsite}) { // from props we are only going to use the properties of the campsite object, so we can destructure that in the parameter list.
    if (campsite) { // make sure campsite isn't null or undefined
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}>
                <Text style={{margin:10}} /* double curly braces again, this is an object */>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />; // reminder: we ALWAYS need to return something from a component, this is just in case we hit a falsy
}

function RenderComments({comments}) { //desctructure the comments array,  it gets the comments array as a property of the props object

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    }; // use an arrow function here, this automatically gets an "item" prop so we can destructure that out

    return ( // we know the comments are in an array, so we're going to use FlatList, which EXPECTS it's data in the form of an array - IMPORTANT
        <Card title='Comments'>
            <FlatList
                data={comments} // give it the comments array as it's data prop
                renderItem={renderCommentItem} // gonna pass a new function here to render individual comments
                keyExtractor={item => item.id.toString()} // all the comments have a unique id so we'll pass that to keyExtractor
            />
        </Card>
    );
}

// convert this from functional into a class component
class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES, // somewhat obvious but this is how we bring data in from files to state
            comments: COMMENTS
        };
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); // this was held by onPress in Directory and accessed via the navigation prop. it's passed automatically to all components that are set up as screens, as we did to this component and Directory in Main.
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0]; // from props we are going to pull out a campsite object and send it to RenderCampsite. note: we're no longer passing this via props.campsite, we just created an object called 'campsite' instead.
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId); // here we are going to use the campsiteId number from comments.js to find the matching comments for each campsite using filter.
        return (
            <ScrollView>
            <RenderCampsite campsite={campsite} />
            <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default CampsiteInfo;