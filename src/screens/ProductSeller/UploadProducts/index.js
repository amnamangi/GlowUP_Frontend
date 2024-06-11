import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Button from '../../../components/Button';
import {styles} from './styles';
import {images} from '../../../services/utilities/images';
import {colors} from '../../../services/utilities/colors';

export default function UploadProducts({navigation}) {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');

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
        setProductImage(img);

        // Send the image to your backend API
        const formData = new FormData();
        formData.append('file', {
          uri: img.uri,
          type: img.type,
          name: img.fileName || `photo.${img.uri.split('.').pop()}`,
        });

        // Include your Cloudinary upload preset name here
        formData.append('upload_preset', 'sw85ihmu');

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
        setProductImage(img);

        // Send the image to your backend API
        const formData = new FormData();
        formData.append('file', {
          uri: img.uri,
          type: img.type,
          name: img.fileName || `photo.${img.uri.split('.').pop()}`,
        });

        // Include your Cloudinary upload preset name here
        formData.append('upload_preset', 'sw85ihmu');

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

  const handleSubmit = async () => {
    // Validate the fields
    const nameValid = productName.trim() !== '';
    const idValid = productId.trim() !== '';
    const descriptionValid = productDescription.trim() !== '';
    const imageValid = productImage !== null;

    // Check if all fields are valid
    if (nameValid && idValid && descriptionValid && imageValid) {
      try {
        // Create the product object
        const productData = {
          productName: productName,
          productId: productId,
          productDescription: productDescription,
          productImage: productImage,
        };

        // Send request to backend
        const response = await axios.post(
          'http://172.16.175.193:5000/api/seller/products',
          productData,
        );

        // Check if product was successfully created
        if (response.status === 201) {
          // Product created successfully, handle success
          console.log(response.data.message);
          // Optionally, navigate to a success page or refresh the product list
        } else {
          // Product creation failed, handle error
          console.error('Product creation failed:', response.data.error);
          // Display error message to user
          setError('Product creation failed. Please try again.');
        }
      } catch (error) {
        // Error occurred while uploading product, handle error
        console.error('Error while uploading product:', error);
        // Display error message to user
        setError(
          'An error occurred while uploading product. Please try again.',
        );
      }
    } else {
      // If any field is invalid, display error message to user
      setError('*Please fill all required fields');
    }
  };

  return (
    <View style={styles.productBakcground}>
      <Text style={styles.heading}>Upload Products</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.body}>
          <Text style={styles.txtFeildHeading}>Product Name</Text>
          <TextInput
            style={styles.textFeildContainer}
            placeholder="Product Name"
            placeholderTextColor={colors.gray}
            onChangeText={setProductName}
            value={productName}
          />
          <Text style={styles.txtFeildHeading}>Product ID</Text>
          <TextInput
            style={styles.textFeildContainer}
            placeholder="Product ID"
            placeholderTextColor={colors.gray}
            onChangeText={setProductId}
            value={productId}
          />
          <Text style={styles.txtFeildHeading}>Description</Text>
          <TextInput
            style={styles.descriptionTxtField}
            placeholder="Description"
            placeholderTextColor={colors.gray}
            onChangeText={setProductDescription}
            value={productDescription}
            multiline={true}
            numberOfLines={3}
          />
          <Text style={styles.txtFeildHeading}>Product Images</Text>
          <TouchableOpacity
            style={styles.photoContianer}
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
              ]);
            }}>
            {productImage ? (
              <Image
                style={styles.productImg}
                source={{uri: productImage.uri}}
              />
            ) : (
              <Image
                style={styles.productImg}
                source={images.uploadProductImg}
              />
            )}
          </TouchableOpacity>
          <View style={styles.button}>
            <Button title={'Upload Product'} onPress={handleSubmit} />
          </View>
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </ScrollView>
    </View>
  );
}
