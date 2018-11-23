import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,        
      },
      props.style && {
        ...props.style
      }
    ]),

    overlay: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_2,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        opacity: 1
      },
    ]),

    image: StyleSheet.flatten([
      {
        width: props.width,
        height: props.height
      },
    ]),

    button: StyleSheet.flatten([
      {
        position: 'absolute',
        right: styles.INTENT,
        top: styles.IS_IPHONE_X ? styles.SPACE_TOP + styles.INTENT : styles.INTENT,
        zIndex: 20
      },
    ]),


  });

