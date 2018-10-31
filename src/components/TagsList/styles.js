import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {

      },
      props.bgMode && {
        backgroundColor: styles.COLOR_9,
        paddingHorizontal: styles.INTENT,
        paddingTop: styles.INTENT,
        paddingBottom: styles.INTENT * 2,
      },
      props.style && {
        ...props.style
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: styles.MARGIN
      },
    ]),


  });

