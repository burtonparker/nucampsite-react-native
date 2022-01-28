import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date(), // built in JavaScript function here
            showModal: false // use this component's local state to determine whether the modal will be shown or not. modal shows when this is true, when false, not so much.
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal}); // checks the current state of the showModal property, and toggles it to it's opposite using setState and the logical not operator.
    }

    handleReservation() {
        console.log(JSON.stringify(this.state)); // this logs the user input and resets the state back to the default from the constructor.
        this.toggleModal(); // we're still logging to the console for debugging, but notice we're also opening the modal now too.
    }
        
    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
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
                <Modal
                    animationType={'slide'} // slide, fade, or none
                    transparent={false} // transparent or opaque
                    visible={this.state.showModal} // follows showModal's state true/false
                    onRequestClose={() => this.toggleModal()} // what happens when the user clicks the hardward back button on their mobile device 
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
                        <Text style={styles.modalText}>
                            Number of Campers: {this.state.campers}
                        </Text>
                        <Text style={styles.modalText}>
                            Hike-In?: {this.state.hikeIn ? 'Yes' : 'No' /* ternary to display text based on true or false input */}
                        </Text>
                        <Text style={styles.modalText}>
                            Date: {this.state.date.toLocaleDateString('en-US')}
                        </Text>
                        <Button 
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#5637dd'
                            title='Close'
                        />
                    </View>
                </Modal>
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
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;