import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  useColorScheme,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTrainings = () => {
  const [companies, setCompanies] = useState([]);
  const [userId, setUserId] = useState('');
  const email = useSelector((state) => state.auth.email);
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  useEffect(() => {
    // Filter the companies based on the search term whenever it changes
    const filteredData = companies.filter((company) =>
      company.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filteredData);
  }, [searchTerm, companies]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log('Stored userId:', storedUserId);

        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          // If userId is not found in AsyncStorage, fetch it from the API
          const response = await axios.get('https://movieappi.onrender.com/user');
          console.log('API response:', response.data);
          const data = response.data;
          const loggedInUser = data.find(user => user.email === email);

          if (loggedInUser) {
            setUserId(loggedInUser.id);
            // Save the fetched userId in AsyncStorage for future use
            await AsyncStorage.setItem('userId', loggedInUser.id.toString());
          } else {
            console.error('User not found!');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://movieappi.onrender.com/training/${userId}`);
        setCompanies(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={styles.card}>
          <Image source={{ uri: `https://1is.az/${item.image}` }} style={styles.image} />
        </View>
        <View style={{ flexDirection: "row", margin: 20, columnGap: 200, top: -40,  }}>
          <Text style={[styles.company, { color: isDarkMode ? 'white' : 'black',}]}>{item.title}</Text>
          <Text style={[styles.price, { backgroundColor:item?.payment_type === '1' ? 'transparent' : 'green',justifyContent:"center" , right:40, top:3}]}>
            {item?.payment_type === '1' ? (
              `${item?.price} azn`
            ) : (
              'Odenissiz'
            )}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? "#1B1523" : '#F4F9FD' }]}>

      <FlatList
        horizontal
        data={companies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: 300,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 12,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 5,
  },
  company: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: 'white',
  },
});

export default MyTrainings;