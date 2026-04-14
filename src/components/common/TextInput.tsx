import React, {FC, useEffect, useState} from 'react';
import {
  View,
  TextInput as Input,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  normalize,
  verticalScale,
} from '@utils/orientation';
import {Colors, Fonts, Icons} from '@app/themes';
import {hexToRGB} from '@app/utils/helpers';
import {isIos} from '@app/utils/helpers/Validation';

interface TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderColor?: string;
  editable?: boolean;
  width?: string | number;
  height?: number;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  tintColor?: string;
  maxLength?: number;
  marginVertical?: number;
  rightIcon?: number;
  iconStyle?: ImageStyle;
  onRightIconPress?: () => void;
}

const TextInput: FC<TextInputProps> = ({
  value,
  onChangeText = () => {},
  keyboardType = 'default',
  secureTextEntry = false,
  placeholder = '',
  placeholderColor = Colors.black_pearl,
  editable = true,
  width = '95%',
  height = normalize(50),
  backgroundColor = Colors.white,
  textAlign = 'left',
  fontSize = normalize(14),
  tintColor = Colors.black_pearl,
  maxLength,
  marginVertical = moderateScale(7),
  rightIcon,
  iconStyle,
  onRightIconPress,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const containerStyle: StyleProp<ViewStyle | any> = {
    width: typeof width === 'number' ? width : `${width}`,
    height,
    backgroundColor,
    marginVertical,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: hexToRGB(Colors.black_pearl, isIos() ? 0.09 : 0.8),
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
  };

  return (
    <View style={containerStyle}>
      <Input
        value={value}
        editable={editable}
        maxLength={maxLength}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        style={[styles.input, {textAlign, fontSize, color: Colors.black_pearl}]}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.iconWrapper}>
          <Image
            source={isSecure ? Icons.hide : Icons.show}
            style={[styles.icon, {tintColor}, iconStyle]}
          />
        </TouchableOpacity>
      )}
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconWrapper}>
          <Image
            source={rightIcon}
            style={[styles.icon, {tintColor}, iconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: Fonts.PoppinsMedium,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(10),
  },
  icon: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
  },
});
