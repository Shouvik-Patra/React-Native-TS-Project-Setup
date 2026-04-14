import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Images} from '@app/themes';
import {navigate, goBack} from '@app/navigation/RootNaivgation';
import {normalize} from '@app/utils/orientation';

type HomeHeaderProps = {
  title: string;
  showBack?: boolean;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({title, showBack = false}) => (
  <View style={styles.headerContainer}>
    {/* Left - Back Button */}
    <View style={styles.sideContainer}>
      {showBack && (
        <TouchableOpacity onPress={goBack}>
          <Image resizeMode='contain' source={Images.backArrow} style={styles.backIcon} />
        </TouchableOpacity>
      )}
    </View>

    {/* Center - Title */}
    <Text style={styles.headerText}>{title}</Text>

    {/* Right - User Icon */}
    <View style={styles.sideContainer}>
      <TouchableOpacity onPress={() => navigate('Settings')}>
        <Image source={Images.user} style={styles.userIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#170101',
    height: normalize(70),
  },
  sideContainer: {
    width: normalize(40),
    marginTop: normalize(20),
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    marginTop: normalize(20),
    fontWeight: '500',
    color: '#ffffff',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default HomeHeader;