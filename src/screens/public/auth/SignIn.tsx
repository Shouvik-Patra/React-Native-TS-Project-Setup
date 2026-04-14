import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import {navigate} from '@app/navigation/RootNaivgation';
import {normalize} from '@utils/orientation';
import {Fonts} from '@app/themes';
import {showMessage} from '@utils/helpers/Toast';
import {validMinLength} from '@utils/helpers/Validation';
import {useAppDispatch, useAppSelector} from '@app/store';
import KeyboardAvoidingTemplate from '@app/components/template/KeyboardAvoidingTemplate';
import Loader from '@app/utils/helpers/Loader';
import {signInRequest} from '@app/store/slice/auth.slice';

const SignInScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth);
  const [mobile_number, setMobile_number] = useState('8961700942');
  const [password, setPassword] = useState('123456');

  const validateFields = () => {
    let isValid = true;

    if (!mobile_number) {
      showMessage('Mobile Number is required.');
      isValid = false;
    } else if (!password) {
      showMessage('Password is required.');
      isValid = false;
    } else if (!validMinLength.test(password)) {
      showMessage('Password must be at least 8 characters long.');
      isValid = false;
    }

    return isValid;
  };

  async function handleSignIn() {
    if (validateFields()) {
      try {
        dispatch(
          signInRequest({
            mobile_number,
            password,
            fcm_token: "XYZ123ABC456",
          }),
        );
        // showMessage(result?.message);
      } catch (error) {
        console.log('Error in handleSignIn:', error);
      }
    }
  }

  console.log('loading - ',loading);
  

  return (
    <KeyboardAvoidingTemplate>
      <Loader visible={loading} />
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/6415/6415824.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to MyApp</Text>
        <Text style={styles.description}>
          Sign in to access your account and enjoy all the features!
        </Text>

        <TextInput
          placeholder="mobile_number"
          value={mobile_number}
          onChangeText={setMobile_number}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Sign In" onPress={handleSignIn} />

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(10),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: normalize(90),
    height: normalize(90),
    alignSelf: 'center',
    marginBottom: normalize(20),
  },
  title: {
    fontSize: normalize(20),
    fontFamily: Fonts.PoppinsBold,
    textAlign: 'center',
    marginBottom: normalize(8),
  },
  description: {
    fontSize: normalize(12),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsRegular,
    color: '#666',
    marginBottom: normalize(80),
  },
  footerText: {
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: normalize(15),
    color: '#666',
  },
  link: {
    color: '#007BFF',
    fontFamily: Fonts.PoppinsMedium,
  },
});

export default SignInScreen;
