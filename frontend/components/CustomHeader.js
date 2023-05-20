import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="md-menu" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;