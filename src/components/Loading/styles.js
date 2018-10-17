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
        paddingHorizontal: styles.GUTTER,
        paddingVertical: styles.GUTTER*3,
      },
      props.style && {
        ...props.style
      }
    ]),

    overlay: StyleSheet.flatten([
      {
        backgroundColor: '#000',
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
        color: styles.COLOR_GREY,
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
        color: '#fff',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
    ]),

    logoHighlight: StyleSheet.flatten([
      {
        color: styles.COLOR_RED
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
        color: styles.COLOR_GREY
      },
    ]),

  });

