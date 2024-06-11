import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';
import { images } from "../../../services/utilities/images";
import { styles } from "./style";

export default function SalonProfile({ navigation }) {
    const [profileImage, setProfileImage] = useState(images.profileTop);
    const [userName, setUserName] = useState('Seeba')
    const [userEmail, setUserEmail] = useState('seeba.mubarak.gmail')

    

    const handleEditProfile = () =>{
        navigation.navigate("SalonEditProfile")
    }
    
    const handleSecurity = () =>{
        navigation.navigate('SalonSecurity')
    }
    
    const handleSignout = () => {
        navigation.navigate('SalonSignUp')
    }
    
    
    
    return (
        <View style={styles.serviceBackgroud}>
            <View style={styles.topContainer}>
                <Text style={styles.serviceText}>Profile</Text>
            </View>
            <View style={styles.contianerTwo}>
                <View style={styles.profileDetailRow}>
                    <Image source={profileImage} />
                    <View style={styles.marginStart}>
                        <Text style={styles.nameTxt}>{userName}</Text>
                        <Text style={styles.emailTxt}>{userEmail}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={handleSignout}
                >
                    <Image
                        style={styles.signOutContianer}
                        source={images.signout} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerThree}>
                <TouchableOpacity style={styles.feildsContianer}
                onPress={handleEditProfile}
                >
                    <View style={styles.feilds}>
                        <Image source={images.editProfile} />
                        <Text style={styles.feildsName}>Edit Profile</Text>
                    </View>
                    <Image
                        style={styles.next}
                        source={images.nextArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.feildsContianer}
                onPress={handleSecurity}
                >
                    <View style={styles.feilds}>
                        <Image source={images.security} />
                        <Text style={styles.feildsName}>Security</Text>
                    </View>
                    <Image
                        style={styles.next}
                        source={images.nextArrow} />
                </TouchableOpacity>
                
            </View>
        </View>
    )

}