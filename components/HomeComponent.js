import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
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

// RIP constructor

    static navigationOptions = {
        title: 'Home'
    }

// note: ScrollView loads everything at once, whereas FlatList uses LazyLoad and preserves memory

    render() {
        return (
            <ScrollView>
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
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);