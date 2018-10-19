import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
        // top: '100%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,
        paddingHorizontal: styles.INTENT,
        paddingVertical: styles.INTENT*3,
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

    text: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_4,
        fontWeight: '500',
        zIndex: 2,
        position: 'relative'
      },
    ]),

    logoContainer: StyleSheet.flatten([
      {
        flex: 1,
        justifyContent: 'center'
      },
    ]),

    logo: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE*2,
        color: styles.COLOR_1,
        fontWeight: '700',
        textTransform: 'uppercase'
      },
    ]),

    logoHighlight: StyleSheet.flatten([
      {
        color: styles.COLOR_3
      },
    ]),

    newLine: StyleSheet.flatten([
      {
        flexDirection: 'row',
        justifyContent: 'center',
      },
    ]),

    colorGray: StyleSheet.flatten([
      {
        color: styles.COLOR_4
      },
    ]),

  });

