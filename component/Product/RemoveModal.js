import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
const HEIGHT_MODAL = 150;
const WIDTH= Dimensions.get('window').width;
const RemoveModal = (props) => {
    const closeModal = (bool,data) => {
        props.changeModalVisible(bool);
        props.confirmRemove(data);
    }
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>Bạn có chắc chắn muốn xoá không</Text>
        </View>
        <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.touchableOpacity} 
        onPress={()=> {closeModal(false,'Cancel')}}>
          <Text style={[styles.text,{color:'red'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}
        onPress={()=> {closeModal(false,'Ok')}}>
          <Text style={[styles.text,{color:'blue'}]}>Ok</Text>
        </TouchableOpacity>
      </View>
      </View>
      
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH -80,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  touchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  textView: {
    flex: 1,
    alignItems: "center",
  },
  buttonsView: {
    width: "100%",
    flexDirection: "row",
  },
});
export default RemoveModal;
