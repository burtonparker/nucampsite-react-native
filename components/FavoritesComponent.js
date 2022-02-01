import React, { Component } from 'react'; // Component because we're going to make a class component
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux'; // connect to the store to get that sweet sweet data
import { Loading } from './LoadingComponent'; // show while we load
import { baseUrl } from '../shared/baseUrl'; // because we need images
import {SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => { // let's think about what data we would need to favorite a campsite? well, we would need the campsites and the favorites, so let's pass those to props.
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation; // note: we want every favorite in the list, to be able to be pressed or clicked, to route the user to the corresponding campsite info component. we will need access to the navigate function that's available as a method of the navigation prop. because we're setting this component up as a navigator, we have access to the navigation prop. we can destructure out the navigate function here - we did this in the directory component as well, for reference.
        const renderFavoriteItem = ({item}) => { // destructure the current item from the array.
            return (
                <SwipeRow rightOpenValue={-100} /* if you swipe right to left at least 100 pixels, the swipe options will be shown. note: SwipeRow is going to expect some View components too */ style={styles.swipeRow}>
                    <View style={styles.deleteView} /* this View holds the content we show AFTER the swipe */ >
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() => this.props.deleteFavorite(item.id)} // fire off deleteFavorite 
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View /* this View holds the content we show BEFORE the swipe */ >
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})} // makes this into a link, we route to the CampsiteInfo screen, along with the campsiteId as a parameter
                        />
                    </View>
                </SwipeRow> // SwipeRow makes ListItems swipeable! we're technically done with the Favorites component but we still need to ADD it to our navigation set up in the Main component so that we can actually navigate TO it.
            );
        };

        if (this.props.campsites.isLoading) { // first of all, has the data even loaded yet? we communicate status to the user.
            return <Loading />;
        }
        if (this.props.campsites.errMess) { // and let's check for any errors to and message that to the user. notice again, since we're in a 'class' component, we have to use 'this'.
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);