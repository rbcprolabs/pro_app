import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        position: 'absolute',
        left: styles.INTENT - 4,
        right: styles.INTENT - 4,
        bottom: styles.MARGIN * 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: styles.INTENT,
        backgroundColor: styles.COLOR_2,
        borderRadius: styles.RADIUS
      },
      props.style && {
        ...props.style
      },
      // props.newCount && {
      //   paddingRight: 5
      // }
    ]),

    content: StyleSheet.flatten([
      {
        flexDirection: 'row',
        flexShrink:1,
      }
    ]),

    detail: StyleSheet.flatten([
      {
        flexShrink: 1,
        paddingTop: 2,
        paddingHorizontal: styles.INTENT / 2
      }
    ]),

    title: StyleSheet.flatten([
      {
        color: styles.COLOR_1,
        fontSize: styles.FONT_SIZE - 1,
        fontWeight: '600'
      }
    ]),

    subtitle: StyleSheet.flatten([
      {
        color: styles.COLOR_4,
        fontSize: styles.FONT_SIZE - 6,
        paddingTop: 2,
        fontWeight: '600'
      }
    ]),

    image: StyleSheet.flatten([
      {
        width: 40,
        height: 40,
        borderRadius: styles.RADIUS,
        overflow: 'hidden',
        flexShrink: 0,
      }
    ]),

    buttonContainer: StyleSheet.flatten([
      {
        flexDirection: 'row',
        flexShrink: 0,
        flexGrow: 0
      }
    ]),

    button: StyleSheet.flatten([
      {
        marginBottom: 0,
        flexBasis: 120
      }
    ]),
  });

