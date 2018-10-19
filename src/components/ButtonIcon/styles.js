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
        fontSize: styles.INTENT * 2,
        
        color: styles.COLOR_4
      },
      props.iconStyle && {
        ...props.iconStyle
      }
    ]),

    badge: StyleSheet.flatten([
      {
        position: 'absolute',
        right: -3,
        top: -5,
        fontSize: styles.INTENT * 2,
      }
    ]),
  });

