import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    wrap: StyleSheet.flatten([
      {
        position: 'relative',
        backgroundColor: styles.COLOR_1,
        marginBottom: styles.INTENT,
        borderBottomRightRadius: styles.RADIUS,
        borderBottomLeftRadius: styles.RADIUS,
        flexBasis: '100%',
        borderRadius: styles.RADIUS,
        overflow: 'hidden'
      },
      props.style && {
        ...props.style
      },
    ]),

    header: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_2,
        paddingVertical: styles.INTENT/2
      },
    ]),

    container: StyleSheet.flatten([
      {
        paddingHorizontal: styles.MARGIN,
      },
    ]),

    content: StyleSheet.flatten([
      {
        paddingTop: styles.INTENT,
        paddingHorizontal: styles.MARGIN,
        paddingBottom: styles.MARGIN,
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 2,
        fontWeight: '600',
        color: styles.COLOR_2,
      },
    ]),

  });

