import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import BackArrow from '../../../components/BackArrow';
import Button from '../../../components/Button';

export default function SalonAddService({navigation}) {
  const [serviceName, setServiceName] = useState('');
  const [serviceStyles, setServiceStyles] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [servicesData, setServiceData] = useState([]);

  useEffect(() => {
    // Fetch services data from the backend
    const fetchServices = async () => {
      try {
        const response = await fetch(
          'http://your-ip-address:5000/api/services/fetch',
        );
        const result = await response.json();
        if (result.success) {
          setServiceData(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleTagPress = tag => {
    setServiceName(tag.serviceName);
    setServiceStyles(tag.serviceStyles);
    setServiceImage(tag.serviceImage);
  };

  const handleAddService = async () => {
    try {
      const response = await fetch(
        'http://your-ip-address:5000/api/services/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceName,
            serviceStyles,
            serviceImage,
          }),
        },
      );
      const result = await response.json();
      if (result.success) {
        setServiceData([...servicesData, result.data]);
        setServiceName('');
        setServiceStyles('');
        setServiceImage('');
        alert('Service added successfully!');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.backArrow}>
            <BackArrow onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.centerHeader}>
            <Text style={styles.headerText}>Add Services</Text>
            <Text style={styles.subText}>
              Choose from the options below to set up the services offered at
              your barber shop
            </Text>
          </View>
          <View style={styles.containerBody}>
            <TextInput
              style={styles.textInputContainer}
              placeholder="Service Name"
              value={serviceName}
              onChangeText={setServiceName}
            />
            <TextInput
              style={styles.textInputContainer}
              placeholder="Service Styles"
              value={serviceStyles}
              onChangeText={setServiceStyles}
            />
            <TextInput
              style={styles.textInputContainer}
              placeholder="Service Image URL"
              value={serviceImage}
              onChangeText={setServiceImage}
            />
            <Button title="Add Service" onPress={handleAddService} />
            <View style={styles.services}>
              {servicesData.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceImagecontainer}
                  onPress={() => handleTagPress(tag)}>
                  <Image
                    source={{uri: tag.serviceImage}}
                    style={styles.serviceImageresize}
                    resizeMode="contain"
                  />
                  <Text style={styles.serviceTexts}>{tag.serviceName}</Text>
                  <Text style={styles.serviceTexts}>{tag.serviceStyles}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.nextBtn}>
            <Button
              title={'Next'}
              onPress={() => navigation.navigate('SalonAddServiceInfo')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
