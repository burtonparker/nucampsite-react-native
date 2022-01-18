import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

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

function CampsiteInfo(props) {
    return <RenderCampsite campsite={props.campsite} />; // from props we are going to pull out a campsite object and send it to RenderCampsite
}

export default CampsiteInfo;