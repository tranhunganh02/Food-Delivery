import React, { useEffect, useState } from "react";
import { Modal, ActivityIndicator, StyleSheet, View, Text } from "react-native";

const ModalLoading = ({ visible, time, onLoading }) => {
  const [showModal, setShowModal] = useState(visible);
  const handleLoading = (isEnd) => {
    onLoading(isEnd);
  };
  useEffect(() => {
    setShowModal(visible);
    if (visible) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
        handleLoading(false);
      }, time);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [visible, time]);

  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="gray" />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
  },
});

export default ModalLoading;
