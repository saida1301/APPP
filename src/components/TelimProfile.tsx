import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import TelimAdd from './TelimAdd';
import Companies from './Companies';
import Vacancies from './Vacancies';
import CategoryItem from './CategoryItem';
import Total from './Total';
import Tenzimleme from './Tenzimleme';
import LogoutConfirmation from './LogoutConfirmation';

import AddTrainingComponent from './AddTrainingComponent';
import MyProfile from './MyProfile';
import MyTrainings from './MyTrainings';
import { useTranslation } from 'react-i18next';

const TelimProfile = () => {
  const [profileButton, setProfileButton] = useState(1);
const isDarkMode = useColorScheme() === 'dark';
  const handlePress = (buttonNumber: React.SetStateAction<number>) => {
    setProfileButton(buttonNumber);
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Perform logout action here
    setShowLogoutModal(false);
  };

const {t} = useTranslation();

  return (
    <View>
      <View style={[styles.containerBox,  {backgroundColor: isDarkMode ? "#1B1523" : '#F4F9FD'},]}>
        <Pressable
           onPress={() => handlePress(1)}
          style={[
            styles.card,
            {backgroundColor: isDarkMode ? "#1B1523" : '#F4F9FD'},
            profileButton === 1 ? styles.activeCard : styles.card,
          ]}
        >

          <Text
            style={[
              styles.text,
              profileButton === 1 ? styles.activeText : styles.text,
            ]}
          >
      {t('add_telim')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handlePress(2)}
          style={[
            styles.card,
            {backgroundColor: isDarkMode ? "#1B1523" : '#F4F9FD'},
 profileButton === 2 ? styles.activeCard : styles.card,
          ]}
        >
 
          <Text
            style={[
              styles.text,
              profileButton === 2 ? styles.activeText : styles.text,
            ]}
          >
          {t('siyahi')}
          </Text>
        </Pressable>

     
    
      </View>
      {profileButton === 1 && <AddTrainingComponent />}
      {profileButton === 2 &&  <MyTrainings/>}
 
    </View>
  );
};

export default TelimProfile;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 300,
    height: 60,
    borderRadius: 10,

    marginTop:10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', // Use flexDirection: 'row' to place image and text side by side
    alignItems: 'center', // Use alignItems: 'center' to center items vertically
    justifyContent: 'center',
  },
  activeCard:{
    width:"100%",
    maxWidth:300,
    height:60,
    borderRadius:10,
    backgroundColor:"#9559E5"

  },
  containerBox: {
    flexDirection:"column",
    alignItems:"center",
    marginHorizontal:20,
    marginVertical:20,
    columnGap:20,
    width:"100%",
    maxWidth:370,
    height:195,
    justifyContent:"center",
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text:{
    color: "#9559E5",
    fontSize:14,
    fontWeight:"600",
    textAlign:"center",
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    margin: 20
  },
  activeText:{
    color: "white",
    fontSize:14,
    fontWeight:"600",
    textAlign:"center",
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    margin: 20
   
  }
});