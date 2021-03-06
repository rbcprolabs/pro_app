import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        position: 'relative',
        paddingVertical: styles.INTENT-5,
        paddingHorizontal: styles.INTENT-2,
        aspectRatio: 1,
        borderRadius: styles.RADIUS+3,
      },
      props.style && {
        ...props.style
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 8,
        fontWeight: '600'
      },
    ]),

  });

