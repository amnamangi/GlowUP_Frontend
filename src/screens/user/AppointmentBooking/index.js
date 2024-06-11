import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../components/BackArrow';
import {images} from '../../../services/utilities/images';
import Button from '../../../components/Button';
import {styles} from './style';
import {colors} from '../../../services/utilities/colors';
import {Calendar} from 'react-native-calendars';
import {sizes} from '../../../services/utilities/sizes';

export default function AppointmentBooking({navigation}) {
  const [selectTime, setSelectTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [itemCart, setItemCart] = useState([
    {
      name: 'Acne Facial',
      price: 2000,
      image: images.acneIcon,
    },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [availableTime, setAvailableTime] = useState([
    {time: '10:00 AM'},
    {time: '11:00 AM'},
    {time: '12:00 PM'},
    {time: '01:00 PM'},
    {time: '02:00 PM'},
    {time: '03:00 PM'},
    {time: '04:00 PM'},
    {time: '05:00 PM'},
    {time: '06:00 PM'},
    {time: '07:00 PM'},
    {time: '08:00 PM'},
    {time: '09:00 PM'},
  ]);

  const handleTimePress = time => {
    setSelectTime(time);
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {};
  markedDates[selectedDate] = {
    selected: true,
    selectedColor: colors.selectedPurple,
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleRemoveService = index => {
    const newCart = itemCart.filter((_, i) => i !== index);
    setItemCart(newCart);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAppointmentBookingDetail = async () => {
    try {
      const response = await fetch(
        'http://172.16.175.193:5000/api/user/appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: itemCart[0].name,
            price: itemCart[0].price,
            image: itemCart[0].image,
            date: selectedDate,
            time: selectTime,
            quantity: quantity,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigation.navigate('AppointmentBookingDetail', {appointment: data});
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <View style={styles.productBakcground}>
      <View style={styles.topContainer}>
        <View style={styles.backArrow}>
          <BackArrow onPress={handleBack} />
        </View>
        <Text style={styles.heading}>Appointment Booking</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View>
          {itemCart.map((item, index) => {
            return (
              <View style={styles.body} key={index}>
                <View style={styles.textFeildContainer}>
                  <View style={styles.productImageContainer}>
                    <Image style={styles.productImage} source={item.image} />
                  </View>
                  <View style={styles.flexColumn}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <TouchableOpacity onPress={handleSubtract}>
                      <Image source={images.subtract} />
                    </TouchableOpacity>
                    <Text style={styles.itemName}>{quantity}</Text>
                    <TouchableOpacity onPress={handleAdd}>
                      <Image source={images.add} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRemoveService(index)}>
                      <Text style={styles.removeText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.grayHeading1}>
          Select Date and Time for your appointment
        </Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={{
            marginHorizontal: sizes.screenWidth * 0.05,
            marginTop: sizes.screenHeight * 0.01,
          }}
          theme={{
            calendarBackground: colors.calenderBg,
            selectedDayBackgroundColor: colors.selectedPurple,
            todayTextColor: colors.darkPurple,
            selectedDayTextColor: colors.black,
            arrowColor: colors.darkPurple,
          }}
        />
        <Text style={styles.availableTimeHeading}>Available Time</Text>
        <View style={styles.timingView}>
          {availableTime.map((item, index) => (
            <View style={styles.timingViewRow} key={index}>
              <TouchableOpacity
                style={[
                  styles.timingNotSelected,
                  selectTime === item.time && styles.timingSelected,
                ]}
                onPress={() => handleTimePress(item.time)}>
                <Text style={styles.timingTextColor}>{item.time}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.buttonTop}>
          <Button
            title={'Proceed To Payment'}
            onPress={handleAppointmentBookingDetail}
          />
        </View>
      </ScrollView>
    </View>
  );
}
