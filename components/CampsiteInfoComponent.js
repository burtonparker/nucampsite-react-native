import React, { Component } from 'react'; // reminder, we need component when we need to deal with state data
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux'; // how we get the data from the redux store
import { baseUrl } from '../shared/baseUrl';

// you have to pass mapStateToProps to connect in order for this to work
const mapStateToProps = state => { // mapStateToProps lets us pick and choose certain parts of the store so we don't have to load ALL of it
    return {
        campsites: state.campsites,
        comments: state.comments
    };
};

function RenderCampsite(props) { // UPDATE: for Week 2, Lesson 1 - we are now passing more than just campsite data so we need the entire props object in here. specifically this is being done because of our favorite/markFavorite user input. Previous notes from Week 1 lessons... from props we are only going to use the properties of the campsite object, so we can destructure that in the parameter list.

    const {campsite} = props; // we can still destructure just campsite within the function after the above change, like so.

    if (campsite) { // make sure campsite isn't null or undefined
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin:10}} /* double curly braces again, this is an object */>
                    {campsite.description}
                </Text>
                <Icon // what we can use here: https://react-native-elements.github.io/react-native-elements/docs/2.3.2/icon
                    name={props.favorite ? 'heart' : 'heart-o'} // ternary operator here, if favorite is true, display the solid heart icon, if it's false, display the open heart icon.
                    type='font-awesome'
                    color='#f50'
                    raised // adds a subtle shadow effect
                    reverse // reverses the color scheme
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : 
                        props.markFavorite()
                    } // so what's happening here is we are checking if favorite is already set to true and if so we're logging a message to the terminal. if it's false, we let them set the favorite. broken across several lines to make it easier to follow what's happening here in the ternary.

                    // this version below will simply mark is as a favorite but contains no if/then logic to handle a case where we already marked it as a favorite, saving it below for future reference of why the ternary is so helpful in cases like this
                    // onPress={() => props.markFavorite()}
                    // just a dumb alert example for myself
                    // onPress={() => alert('blah blah blah')}
                />
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
            favorite: false // note: for this lesson we're going to store the user selection in the CampsiteInfo components (local) state. long term this isn't a good solution since the data will get wiped anytime the CampsiteInfo component is re-rendered, for example if we hit the back button in the app, but for now this is a good stepping stone towards using the Redux store later. set it to false first, then set up an event handler to switch it to true.
        };
    }

    markFavorite() {
        this.setState({favorite: true}); // toggles favorite property to true. now we need to pass both the favorite property and the markFavorite event handler to the RenderCampsite method/component
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); // this was held by onPress in Directory and accessed via the navigation prop. it's passed automatically to all components that are set up as screens, as we did to this component and Directory in Main.
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0]; // from props we are going to pull out a campsite object and send it to RenderCampsite. note: we're no longer passing this via props.campsite, we just created an object called 'campsite' instead.
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId); // here we are going to use the campsiteId number from comments.js to find the matching comments for each campsite using filter.
        return (
            <ScrollView>
            <RenderCampsite campsite={campsite} 
                favorite={this.state.favorite}
                markFavorite={() => this.markFavorite()} // note: we could also have written onPress={() => this.markFavorite()}
            />
            <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(CampsiteInfo);