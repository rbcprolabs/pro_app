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
        fontSize: styles.GUTTER * 2,
        
        color: styles.COLOR_GREY
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
        fontSize: styles.GUTTER * 2,
      }
    ]),
  });

