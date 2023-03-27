import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default StyleSheet.create({
     container:{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
     },
     Cricle1:{
          position: "absolute",
          width: 96,
          height: 96,
          left: 220,
          top: -5,
          borderRadius: 100,
          backgroundColor: "#9BA0B3",
     },
     Cricle2:{
          position: "absolute",
          width: 165,
          height: 165,
          left: -30,
          top: -15,
          backgroundColor: "#E4CFCA",
          borderRadius: 100,
     },
     Circle3:{
          position: "absolute",
          width: 181,
          height: 181,
          left: 298,
          top: -70,
          backgroundColor: "#A87956",
          borderRadius: 100,
     },
     form:{
          width: windowWidth * 0.8,
          height: windowHeight * 0.64,
     },
     input:{
          height: 300,
          width: "100%",
          justifyContent: "space-evenly",
     },
     input2:{
          height: 350,
          width: "100%",
          justifyContent: "space-evenly",
     },
     text:{
          color: "#9796A1", fontWeight: "300", fontSize: 20
     },
     inputText:{
          width: "100%",
          height: windowHeight * 0.08,
          fontSize: 20,
          borderColor: "#C4C4C4",
          borderRadius: 15,
          borderWidth: 0.5,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
     },
     actionContainer:{
          height: windowHeight * 0.2,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
     },
     buttonAction:{
          width: "70%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 35,
          height: 60,
          backgroundColor: "#DC7255",
     },
     socialContainer:{
          marginTop:10,
          width: windowWidth * 0.8,
          height: windowHeight * 0.18,
          justifyContent: "center",
     },
     socialHeader:{
          flexDirection: "row",
          justifyContent: "space-between",
          height: windowHeight * 0.08,
          alignItems: "center",
     },
     socialBottom:{
          width: "100%",
          height: 100,
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignItems: "center",
     },
     socialButton:{
          backgroundColor: "#fff",
          borderRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          width: windowWidth * 0.35,
          height: 55,
          justifyContent: "space-evenly",
     }
});