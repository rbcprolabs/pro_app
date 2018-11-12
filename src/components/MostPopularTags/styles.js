import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        padding: styles.INTENT,
        borderRadius: styles.RADIUS,
        borderColor: styles.COLOR_2,
        backgroundColor: styles.COLOR_2,
        marginBottom: styles.INTENT
      },

      props.style && {
        ...props.style
      },

    ]),

    content: StyleSheet.flatten([
      {
        paddingTop: styles.INTENT,
        paddingHorizontal: styles.INTENT/2,
      },

    ]),

    buttonContainer: StyleSheet.flatten([
      {
        flexDirection: 'row',
        // marginBottom: styles.INTENT
      },
    ]),

    header: StyleSheet.flatten([
      {
        flexDirection: 'row',
        // marginBottom: styles.INTENT
      },
    ]),

    headerText: StyleSheet.flatten([
      {
        color: styles.COLOR_1,
        fontSize: styles.FONT_SIZE - 6,
        textTransform: 'uppercase',
        fontWeight: '500',
      },
    ]),

    headerLine: StyleSheet.flatten([
      {
        width: 3,
        marginRight: 5,
        borderRadius: 1.5,
        backgroundColor: styles.COLOR_1,
      },
    ]),
  });

