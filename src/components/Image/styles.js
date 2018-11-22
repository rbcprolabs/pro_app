import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        position:'relative',
        marginTop: styles.INTENT
      },
      props.style && {
        ...props.style
      },
    ]),
    button: StyleSheet.flatten([
      {
        position:'absolute',
        right: styles.INTENT,
        top: styles.INTENT,
      }
    ])
  });

