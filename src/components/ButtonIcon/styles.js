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
      props.circleMode && {
        borderRadius: 50,
        backgroundColor: styles.COLOR_1,
        width: styles.FIELD_HEIGHT - 4,
        height: styles.FIELD_HEIGHT - 4,
        paddingTop: 2,
        shadowColor: styles.COLOR_2,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        elevation: 2
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

