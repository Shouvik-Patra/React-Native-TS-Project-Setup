import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { normalize } from '@utils/orientation';
import { Icons } from '@app/themes';
import Button from '@components/common/Button';
import { useAppDispatch, useAppSelector } from '@app/store';
import Picker from '@app/components/common/Picker';
import styles from './style';
import { logoutRequest } from '@app/store/slice/auth.slice';
import HomeHeader from '@app/components/common/HomeHeader';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, userInfo } = useAppSelector(state => state.user);
  const [isVisible, setIsVisible] = useState(false);

  const settingsOptions = [
    { title: 'Change Password', onPress: () => handleChangePassword() },
    {
      title: 'Notification Settings',
      onPress: () => handleNotificationSettings(),
    },
    { title: 'Privacy Settings', onPress: () => {} },
    { title: 'Language Preferences', onPress: () => setIsVisible(true) },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutRequest());
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Account deleted'),
        },
      ],
      { cancelable: true },
    );
  };

  const handleChangePassword = () => {
    // navigate('ChangePassword');
  };

  const handleNotificationSettings = () => {
    // navigate('NotificationSettings');
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity style={styles.optionButton} onPress={item.onPress}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>{item?.title}</Text>
        <Image source={Icons.right_arrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HomeHeader title="Settings" showBack />

      {/* ScrollView to make content scrollable */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: userInfo?.image }} style={styles.userImage} />
          <Text
            style={styles.userName}
          >{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
          <Text style={styles.userDetail}>{userInfo?.email}</Text>
          {/* <Text style={styles.userDetail}>{userInfo.username}</Text> */}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Settings Options */}
        <FlatList
          data={settingsOptions}
          renderItem={renderOption}
          keyExtractor={item => item.title}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Action Buttons */}
        <Button title="Logout" onPress={() => handleLogout()} width={'100%'} />
        <Button
          title="Delete Account"
          onPress={() => handleDeleteAccount()}
          width={'100%'}
        />
      </ScrollView>

      <Picker
        isVisible={isVisible}
        height={normalize(250)}
        isVisibleBar={true}
        children={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Language Picker</Text>
          </View>
        }
        onBackdropPress={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Settings;
