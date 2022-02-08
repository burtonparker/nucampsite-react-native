import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    // only class components can have state

    constructor(props) {
        super(props);

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date() // built in JavaScript function here
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state)); // this logs the user input and resets the state back to the default from the constructor.
            Alert.alert(
                'Begin Search?',
                'Number of Campers: ' + this.state.campers + '\n\n' + 
                'Hike-In?: ' + this.state.hikeIn + '\n\n' + 
                'Date: ' + this.state.date.toLocaleDateString('en-US'),
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        // FIX 1.1: You can only have a single onPress property. To execute multiple commands, group them inside curly braces...
                        // OLD CODE:
                        /*
                        onPress: () => this.resetForm(),
                        onPress: () => console.log('Reservation Canceled')
                        */
                        onPress: () => {
                            this.resetForm();
                            console.log('Reservation Canceled');
                        }
                        // END FIX 1.1
                    },
                    {
                        text: 'OK',
                        // FIX 1.2: You can only have a single onPress property. To execute multiple commands, group them inside curly braces...
                        // OLD CODE:
                        /*
                        onPress: () => this.resetForm(),
                        onPress: () => console.log('Reservation Confirmed')
                        */
                        onPress: () => {
                            this.resetForm();
                            console.log('Reservation Confirmed');
                        }
                        // END FIX 1.2
                    }
                ],
                { cancelable: false }
            );
    }
        
    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View
                    animation='zoomIn' 
                    duration={2000} 
                    delay={1000}
                >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Campers</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.campers}
                            onValueChange={itemValue => this.setState({campers: itemValue})}
                        >
                            <Picker.Item label='1' /* label: what the user sees */ value='1' /* value: what is passed to onValueChange */ />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Hike-In?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.hikeIn} // defaults to false based on initial state above
                            trackColor={{true: '#5637dd', false: null}} 
                            onValueChange={value => this.setState({hikeIn: value})} // update the state based on which way the user toggles the switch
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button
                        onPress={() =>
                                this.setState({showCalendar: !this.state.showCalendar})
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#5637dd'
                            accessibilityLabel='Tap me to select a reservation date.'
                        />
                    </View>
                    {this.state.showCalendar && ( // only want to show the calendar if the showCalendar state property is set to true, so we are going to use the logical && operator. if the left side is false, the right side isn't evaluated at all, so...
                        <DateTimePicker
                            style={styles.formItem}
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={(event, selectedDate) => { // selectedDate is saved to the state. FYI the documentation on this stuff better explains what we're doing here apparently: https://github.com/react-native-community/datetimepicker
                                selectedDate && this.setState({date: selectedDate, showCalendar: false})
                            }}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title='Search'
                            color='#5637dd'
                            accessibilityLabel='Tap me to search for available campsites to reserve.'
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({ // note: our variable doesn't have to be called 'styles', it could be named anything. it could be named 'derek', or even 'derekJunior'.
    formRow: {
        alignItems: 'center', // vertical centering
        justifyContent: 'center', // horizontal centering
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;