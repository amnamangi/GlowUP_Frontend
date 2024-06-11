import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';

export default function ProfilePicture({navigation}) {
  const [profileImage, setProfileImage] = useState(Image.profilePic);

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        Alert(res.customButton);
      } else {
        console.log(res.assets[0]);
        const img = res.assets[0];
        setProfileImage(img);

        // Send the image to your backend API
        const formData = new FormData();
        formData.append('file', {
          uri: img.uri,
          type: img.type,
          name: img.fileName || `photo.${img.uri.split('.').pop()}`,
        });

        // Include your Cloudinary upload preset name here
        formData.append('upload_preset', 'bfhj4p8i');

        fetch('https://api.cloudinary.com/v1_1/donaevbuw/image/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => response.json())
          .then(data => {
            // Handle response from backend if needed
            console.log('Upload response:', data);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            // Handle error
          });
      }
    });
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled camera');
      } else if (res.error) {
        console.log('Camera Error: ', res.error);
      } else {
        console.log(res.assets[0]);
        const img = res.assets[0];
        setProfileImage(img);

        // Send the image to your backend API
        const formData = new FormData();
        formData.append('file', {
          uri: img.uri,
          type: img.type,
          name: img.fileName || `photo.${img.uri.split('.').pop()}`,
        });

        // Include your Cloudinary upload preset name here
        formData.append('upload_preset', 'bfhj4p8i');

        fetch('https://api.cloudinary.com/v1_1/donaevbuw/image/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => response.json())
          .then(data => {
            // Handle response from backend if needed
            console.log('Upload response:', data);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            // Handle error
          });
      }
    });
  };

  // Function to handle navigation
  const handlePress = () => {
    navigation.navigate('MyTabs', {
      profileImageUri: profileImage ? profileImage.uri : null,
    });
  };

  return (
    <View style={styles.homeBackgroud}>
      <Text style={styles.headText}>Profile Picture</Text>
      <TouchableOpacity style={styles.picContainer}>
        <Image
          style={styles.profileImage}
          source={
            profileImage && profileImage.uri
              ? {uri: profileImage.uri}
              : Image.profilePic
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.takePicBtn}
        onPress={() => {
          Alert.alert('Choose Image Source', 'Select the Image Source', [
            {
              text: 'Gallery',
              onPress: () => imageGalleryLaunch(),
            },
            {
              text: 'Camera',
              onPress: () => cameraLaunch(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {cancelable: true},
          ]);
        }}>
        <Image source={Image.camera} />
        <Text style={styles.takePicBtnText}>Choose Image</Text>
      </TouchableOpacity>
      <View style={styles.uploadPicBtn}>
        <Button title={'Next'} onPress={handlePress} />
      </View>
    </View>
  );
}
