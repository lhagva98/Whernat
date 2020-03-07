import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import styles from "./style";
const CategorySearch = ({ onChange }) => {
  const [input, setInput] = useState("");

  changeText = text => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => changeText(text)}
        style={styles.input}
        value={input}
      />
    </View>
  );
};

export default CategorySearch;
