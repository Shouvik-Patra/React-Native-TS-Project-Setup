import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import {normalize} from '@app/utils/orientation';
import {Fonts} from '@app/themes';
import {showMessage} from '@app/utils/helpers/Toast';
import {
  validateEmail,
  validatePassword,
  validMinLength,
} from '@app/utils/helpers/Validation';
import {useAppDispatch} from '@app/store';
import KeyboardAvoidingTemplate from '@app/components/template/KeyboardAvoidingTemplate';
import {signUpRequest} from '@app/store/slice/auth.slice';

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<SignUpProps>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateValue = (field: keyof SignUpProps, value: boolean | string) => {
    setInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateFields = () => {
    let isValid = true;
    if (info.email == '') {
      showMessage('Email is required');
      isValid = false;
    } else if (!validateEmail(info.email)) {
      showMessage('Please enter a valid email address');
      isValid = false;
    } else if (info.password == '') {
      showMessage('Password is required.');
      isValid = false;
    } else if (!validMinLength.test(info.password)) {
      showMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else if (!validatePassword(info.password)) {
      showMessage(
        'Password must contain at least one number, one uppercase and one lowercase letter.',
      );
      isValid = false;
    } else if (info.confirmPassword == '') {
      showMessage('Confirm Password is required.');
      isValid = false;
    } else if (info.password !== info.confirmPassword) {
      showMessage('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  async function handleSignUp() {
    if (validateFields()) {
      try {
        dispatch(
          signUpRequest({
            email: info.email.toLowerCase(),
            password: info.password,
            confirm_password: info.confirmPassword,
          }),
        );
      } catch (error) {
        console.log('Error in handleSignIn:', error);
      }
    }
  }

  return (
    <KeyboardAvoidingTemplate>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/6415/6415824.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.description}>
          Sign up to get started and enjoy all the features of the app!
        </Text>

        <TextInput
          placeholder="Email"
          value={info.email}
          onChangeText={value => updateValue('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={info.password}
          onChangeText={value => updateValue('password', value)}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={info.confirmPassword}
          onChangeText={value => updateValue('confirmPassword', value)}
          secureTextEntry
        />

        <Button title="Sign Up" onPress={handleSignUp} />

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignIn')}>
            Sign In
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

export default SignUp;
