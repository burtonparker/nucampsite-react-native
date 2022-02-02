import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'; // how we get the data from the redux store
import { baseUrl } from '../shared/baseUrl';
import Loading  from './LoadingComponent';

// you have to pass mapStateToProps to connect in order for this to work
const mapStateToProps = state => { // mapStateToProps lets us pick and choose certain parts of the store so we don't have to load ALL of it
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem(props) { // gonna pass this an item we destructure from the props object. note: okay, previously we destructured the 'item' prop from the props object, but now we need to access the isLoading and errMess props as well, so now we're going to replace this with the ENTIRE props object. see git commit history for what this previously looked like.
    const {item} = props; // destructuring the item property inside the component so our code still works.

    if (props.isLoading) { // sidenote - we could destructure this but we aren't
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return(
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) { // we need to store the Animated value in the local component state.
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0) // note: doesn't need to be named 'scaleValue', can be called anything, we are just naming it after what it controls so it's easier to understand wtf is happening here.
        };
    }

    animate() { // same thing here with the name 'animate', it could be any word used for this method, just choosing this one since it's descriptive.
        Animated.timing( // gonna give two arguments here...
            this.state.scaleValue, // the animated value that we want to have change over time.
            { // the second argument is an entire object containing 3 properties
                toValue: 1, // what we want the value to change to, from it's initial value, 0 to 1, aka 100% in terms of scale.
                duration: 1500, // how long does it take to animate from 0 to 1
                useNativeDriver: true // helps improve the perfomance of animations in this library.
            }

        ).start(); // super important - we're chaining a method called 'start' here which starts the animation for us. Animated.timing also has a 'stop' method we could use but we don't need it here.

    }

    componentDidMount() { // to start the animation and run it just once, we're going to call the animate method from the lifecycle method componentDidMount. when the Home component mounts, it will automatically start this animation.
        this.animate();
    }

    static navigationOptions = {
        title: 'Home'
    }

// note: ScrollView loads everything at once, whereas FlatList uses LazyLoad and preserves memory

    render() {
        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);