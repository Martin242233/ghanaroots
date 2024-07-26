import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.sectionHeader}>GENERAL</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>UserName</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>Manuel2vie</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={styles.chevronColor} />
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <View style={{flexDirection: 'row'}}>
            <ListItem.Title style={styles.title}>Edit Picture</ListItem.Title>
            </View>
          </ListItem.Content>
          <ListItem.Chevron color={styles.chevronColor} />
        </ListItem>
        <ListItem bottomDivider>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.sectionHeader}>ACCOUNT</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Edit Account</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>rihabbs738@gmail.com</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={styles.chevronColor} />
        </ListItem>
      </View>
    </ScrollView>
  );
};

const commonStyles = {
  container: {
    flex: 1,
  },
  header: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'left',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  header: {
    ...commonStyles.header,
    color: '#000',
  },
  title: {
    ...commonStyles.title,
    color: '#000',
  },
  subtitle: {
    ...commonStyles.subtitle,
    color: '#888',
  },
  chevronColor: '#000',
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#121212',
  },
  header: {
    ...commonStyles.header,
    color: '#fff',
  },
  title: {
    ...commonStyles.title,
    color: '#fff',
  },
  subtitle: {
    ...commonStyles.subtitle,
    color: '#ccc',
  },
  chevronColor: '#fff',
});

export default SettingsScreen;
