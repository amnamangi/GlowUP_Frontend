import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {styles} from './style';
import {images} from '../../../services/utilities/images';
import BackArrow from '../../../components/BackArrow';
import Button from '../../../components/Button';
import {colors} from '../../../services/utilities/colors';
import axios from 'axios';

export default function SellerSignUp({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = phoneNumber => {
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSignUp = async () => {
    const emailValid = email.trim() !== '' && validateEmail(email);
    const passwordValid = password.trim() !== '';
    const phoneNumberValid =
      phoneNumber.trim() !== '' && validatePhoneNumber(phoneNumber);
    const fullNameValid = fullName.trim() !== '';

    setEmailError(emailValid ? '' : "*Email can't be empty or is invalid");
    setPasswordError(passwordValid ? '' : "*Password can't be empty");
    setPhoneNumberError(
      phoneNumberValid ? '' : "*Phone number can't be empty or is invalid",
    );
    setFullNameError(fullNameValid ? '' : "*Full Name can't be empty");

    if (emailValid && passwordValid && phoneNumberValid && fullNameValid) {
      try {
        const response = await axios.post(
          'http://172.16.175.193:5000/api/seller/createAccount',
          {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
          },
        );

        if (response.data.success) {
          navigation.navigate('SellerProfilePicture', {fullName: fullName});
        } else {
          Alert.alert(
            'Error',
            response.data.message || 'Signup failed. Please try again.',
          );
        }
      } catch (error) {
        console.error('Error during signup:', error);
        Alert.alert('Error', 'An error occurred during signup');
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    navigation.navigate('SellerSignIn');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.homeBackgroud}>
      <View style={styles.backArrow}>
        <BackArrow onPress={handleGoBack} />
      </View>
      <Text style={styles.headText}>Sign Up</Text>
      <View style={styles.contianerTwo}>
        <View style={styles.textFeildContainer}>
          <Image source={images.profile} />
          <TextInput
            style={styles.feildText}
            placeholder="Full Name"
            placeholderTextColor={colors.gray}
            onChangeText={setFullName}
            value={fullName}
          />
        </View>
        {fullNameError ? (
          <Text style={styles.errorText}>{fullNameError}</Text>
        ) : null}
        <View style={styles.textFeildContainer}>
          <Image source={images.email} />
          <TextInput
            style={styles.feildText}
            placeholder="Email"
            placeholderTextColor={colors.gray}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.textFeildContainer}>
          <Image source={images.phone} />
          <TextInput
            style={styles.feildText}
            placeholder="Phone"
            placeholderTextColor={colors.gray}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="numeric"
          />
        </View>
        {phoneNumberError ? (
          <Text style={styles.errorText}>{phoneNumberError}</Text>
        ) : null}
        <View style={styles.textFeildContainer}>
          <Image source={images.password} />
          <TextInput
            style={styles.feildText}
            placeholder="Password"
            placeholderTextColor={colors.gray}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Image source={showPassword ? images.eyeOpen : images.eyeClosed} />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.containerThree}>
        <Button title={'Sign Up'} onPress={handleSignUp} />
        <Text style={styles.continueTxt}>or continue with</Text>
        <TouchableOpacity style={styles.otherButton}>
          <Image source={images.google} />
          <Text style={styles.googleBtnText}>+ Google</Text>
        </TouchableOpacity>
        <Text style={styles.continueTxt}>Already have an account?</Text>
        <TouchableOpacity style={styles.otherButton} onPress={handleSignIn}>
          <Text style={styles.signUpBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
