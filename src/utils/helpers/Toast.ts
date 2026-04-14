import Toast from 'react-native-toast-message';

export const showMessage = (message: string, type: 'success' | 'error' | 'info' = 'error') => {
  if (message !== undefined && message !== '') {
    console.log("message):>>>>>", message);
    
    Toast.show({
      type,
      text1: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  }
};