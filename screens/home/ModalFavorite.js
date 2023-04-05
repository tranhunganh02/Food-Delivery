import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

const ModalFavorite = ({ isModalVisible, toggleModal, modalText }) => {
  return (
     <View
          style={{
               position:'absolute'
          }}
     >
     <Modal isVisible={isModalVisible}>
       <View>
         <Text>{modalText}</Text>
       </View>
     </Modal>
   </View>
  )
}

export default ModalFavorite
