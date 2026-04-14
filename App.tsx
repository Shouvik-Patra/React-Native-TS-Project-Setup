import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { StatusBar } from 'react-native';

const App = () => {
  return(
  <>
  <StatusBar backgroundColor={"white"} barStyle={'dark-content'}/>
   
  <StackNavigation />
  </>
  );
};

export default App;
