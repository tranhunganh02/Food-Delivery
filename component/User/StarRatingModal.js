import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StarRatingModal = ({ visible, onClose, onRate ,onHaveContent, onSubmit}) => {
  const [rating, setRating] = useState(0);
  const handleRate = (selectedRating) => {
    setRating(selectedRating);
    onRate(selectedRating);
    // onClose();
  };
  const handleContentText = (text)=> {
    onHaveContent(text);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 30,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Rating the order
          </Text>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRate(star)}>
                <Icon
                  name={star <= rating ? "star" : "star-o"}
                  size={35}
                  color={star <= rating ? "#FFD700" : "#D3D3D3"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text>Rating content:</Text>
            <TextInput
            onChangeText={(text) => handleContentText(text)}
            style={{borderWidth:1, borderColor: 'grey',padding:10,borderRadius:20}} placeholder="Content about my service"></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity onPress={onSubmit}>
              <Text
                style={{ color: "green", textAlign: "center", marginTop: 10 }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                Hủy bỏ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StarRatingModal;
