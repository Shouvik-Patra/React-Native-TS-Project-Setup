import { normalize } from "@app/utils/orientation";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: normalize(15),
      height: normalize(45),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 6,
      zIndex: 1,
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    scrollContainer: {
      padding: normalize(15),
    },
    userInfoContainer: {
      alignItems: 'center',
      marginBottom: normalize(20),
    },
    userImage: {
      height: normalize(80),
      width: normalize(80),
      borderRadius: normalize(40),
      marginBottom: normalize(10),
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    userDetail: {
      fontSize: 14,
      color: '#666',
      marginBottom: 2,
    },
    divider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 15,
    },
    optionButton: {
      paddingVertical: normalize(15),
      paddingHorizontal: normalize(10),
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginBottom: 10,
      elevation: 2,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: '#333',
    },
    arrowIcon: {
      width: normalize(12),
      height: normalize(12),
      tintColor: '#333',
    },
  });

  export default styles;