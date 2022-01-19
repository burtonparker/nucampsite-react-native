import React, { Component } from 'react'; // reminder, we need component when we need to deal with state data
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

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

// convert this from functional into a class component
class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); // this was held by onPress in Directory and accessed via the navigation prop. it's passed automatically to all components that are set up as screens, as we did to this component and Directory in Main.
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return <RenderCampsite campsite={campsite} />; // from props we are going to pull out a campsite object and send it to RenderCampsite. note: we're no longer passing this via props.campsite, we just created an object called 'campsite' instead.
    }
}

export default CampsiteInfo;