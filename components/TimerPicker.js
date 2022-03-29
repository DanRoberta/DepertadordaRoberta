import { useState }from 'react';
import { Alert, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { addAlarm } from '../actions/alarms';
import ReactNativeAN from 'react-native-alarm-norification';

function TimePicker(props) {

    const [ isDatePickerVisible, setDatePickerVisisbility ] = useState(false);

    const showCalendar = () => {
        setDatePickerVisisbility(true);
    };

    const hideCalendar = () => {
        setDatePickerVisisbility(false);
    };
function handleCalendar(datetime) {
    const currentTime = Date.now();

    if(datetime.getTime() < currentTime) {
        Alert.alert('Opss', 'Por favor escolha uma data futura');
        hideCalendar();
        return;
    };
    
    const fireDate = ReactNativeAN.parseDate(dateTime);

    function makeid() {
        let result = '';
        for(let i = 0; i < 5; i++){
            result += Math.floor(Math.random() * 10);
        };
        return result;
    }
    const alarmNotifData = {
        id: makeid(),
        title: 'Hora de acordar',
        message: 'My message',
        channel: 'alarm-channel',
        ticker: 'My notification Message',
        auto_cancel: true,
        vibrate: true,
        vibration: 100,
        small_icon: 'ic_launcher',
        large_icon: 'ic_launcher',
        play_sound: true,
        tag: 'Trabalhar',
        fire_date: fireDate,
        date: { value: datetime }
    }
    props.add(alarmNotifData);
    ReactNativeAN.scheduleAlarm(alarmNotifData);
    hideCalendar();
} 
    return(
     <>
       <Button
          title='+ Alarmes' 
          color='#6495ED'
          onPress={() => showCalendar()}
        />
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleCalendar} 
          onCancel={hideCalendar}
        />  
     
     </>   
    );
}

const mapStateProps = ((state) => {
    return{}
});
const mapDispatchToProps = ((dispatch) =>{
    return {
        add: alarmNitfObj => {
            dispatch(addAlarm(alarmNotifObj));
        }
    }
});

export default connect(mapStateProps, mapDispatchToProps)(TimePicker)