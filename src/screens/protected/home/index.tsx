import React, {useEffect} from 'react';
import {View, Text, FlatList, SafeAreaView, ListRenderItem} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@app/store';
import styles from './style';
import {getUserInfoRequest} from '@app/store/slice/user.slice';
import {showMessage} from '@app/utils/helpers/Toast';
import Loader from '@app/utils/helpers/Loader';
import HomeHeader from '@app/components/common/HomeHeader';

type Item = {
  id: string;
  title: string;
};

const dummyData: Item[] = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {loading, error} = useAppSelector(state => state.user);

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if (isFocused) {
      getUserInfo();
    }
  }, [isFocused]);

  const getUserInfo = async () => {
    try {
      dispatch(getUserInfoRequest());
    } catch (error) {
      console.log('Error in fetching posts', error);
    }
  };

  const renderItem: ListRenderItem<Item> = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <HomeHeader title="Home" showBack/>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default Home;