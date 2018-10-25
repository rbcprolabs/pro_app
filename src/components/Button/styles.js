import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    btn: StyleSheet.flatten([
      {
        height: styles.FIELD_HEIGHT,
        paddingHorizontal: styles.INTENT,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: styles.RADIUS,
        borderColor: styles.COLOR_2,
        backgroundColor: styles.COLOR_2,
        marginBottom: styles.INTENT
      },

      props.type == '2' && {
        backgroundColor: styles.COLOR_3,
        height: styles.FIELD_HEIGHT - 18,
        paddingHorizontal: styles.INTENT - 7,
        borderRadius: styles.RADIUS / 2,
      },

      props.style && {
        ...props.style
      },

    ]),

    text: StyleSheet.flatten([
      {
        color: styles.COLOR_1,
        fontSize: styles.FONT_SIZE,
        fontWeight: '500',
      },
      props.type == '2' && {
        color: styles.COLOR_1,
        fontSize: styles.FONT_SIZE - 5,
        fontWeight: '600',
      },
    ])
  });

