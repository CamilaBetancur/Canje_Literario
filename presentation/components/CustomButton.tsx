// components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  colorbg: string;
};

const CustomButton = ({ title, onPress, colorbg }: Props) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colorbg }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});
