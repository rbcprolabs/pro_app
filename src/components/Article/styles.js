import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    wrap: StyleSheet.flatten([
      {
        paddingVertical: styles.INTENT,
        paddingHorizontal: styles.INTENT - 4,
        backgroundColor: styles.COLOR_1,
        borderRadius: styles.RADIUS,
      },
      props.style && {
        ...props.style
      },
    ]),

    container: StyleSheet.flatten([
      {
        paddingHorizontal: styles.INTENT - 8,
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 8,
        fontWeight: '600'
      },
    ]),

  });

