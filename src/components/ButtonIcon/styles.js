import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    btn: StyleSheet.flatten([
      {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      
      },
      props.style && {
        ...props.style
      },
      // props.newCount && {
      //   paddingRight: 5
      // }
    ]),

    icon: StyleSheet.flatten([
      {
        
      },
      props.iconStyle && {
        ...props.iconStyle
      }
    ]),
  });

