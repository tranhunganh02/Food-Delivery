import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,Modal } from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
const PaymentModal = ({ visible, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    onClose(method);
  };

  return (
    <Modal
  visible={visible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => onClose(null)}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
      Payment methods
      </Text>
      <TouchableOpacity onPress={() => handlePaymentMethod("Online")}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Online Payment
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePaymentMethod("COD")}>
        <Text style={{ fontSize: 18 }}>Direct Payment</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  );
};

export default PaymentModal;
