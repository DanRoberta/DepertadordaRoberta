import{Button, FlatList, ProgressViewIOSComponent, StyleSheet, Text, View} from 'react-native';
import{ListItem} from 'react-native-elements';
import{connect} from 'react-redux';
import{removeAlarm} from '../actions/alarms';

function ListAlarms(props){
    const keyExtrator = ((item,index)=>index.toString()); 
    const renderItem = (({item}) => {
        
        const[date] = item.alarmNotifiData.fire_data.split(' ');

        return(
          <ListItem style = {{ paddingTop: 10}}>
            <ListItem.Content>
             <ListItem.Title>{item.time.toString()}</ListItem.Title>
             <ListItem.Subtitle>{date}</ListItem.Subtitle>   
                </ListItem.Content>  
                <Button
                   title = 'Remover'
                   color = 'red'
                   onPress = {() => {
                      props.delete (item.value ) 
                   } 
                }
             />   
          </ListItem>
        );
    }); 
    return (
       < View>
        <FlatList
            keyExtractor = {keyExtrator}
            data = {props.alarms} 
            renderItem = {renderItem}
            />
         </View>
      );
    }
 const mapStateProps = ((state) => {
    return {
      alarms : state.alarms.alarms,

    };
 });
 const mapDispatchToProps = ((dispatch) => {
    return {
        delete : value => {
           dispatch(removeAlarm(value));
        }

    }   
 });
 export default connect(mapStateProps, mapDispatchToProps)(ListAlarms)
       