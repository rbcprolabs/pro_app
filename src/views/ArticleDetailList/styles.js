import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        // ...stylesGlobal.container,
        backgroundColor: styles.COLOR_5,
        flex: 1
      }

    ]),

    content: StyleSheet.flatten([
      {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: styles.INTENT,
        paddingBottom: props.paddingBottom,
        paddingHorizontal: styles.INTENT / 4,
      }

    ]),

    close: StyleSheet.flatten([
      {
        position: 'absolute',
        top: styles.MARGIN,
        right: styles.MARGIN,
        zIndex: 99
      }

    ]),

    header: StyleSheet.flatten([
      {
        paddingTop: styles.IS_IPHONE_X ? styles.SPACE_TOP + styles.INTENT - 2 : styles.INTENT - 2,
        paddingBottom: styles.INTENT - 2,
        paddingHorizontal: styles.MARGIN,
        backgroundColor: styles.COLOR_1,
        borderBottomWidth: 1,
        borderColor: styles.COLOR_8
      }

    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 11,
        color: styles.COLOR_2,
        fontWeight: '700',
        paddingRight: !styles.IS_IPHONE_X ? styles.INTENT * 2 : 0
      }

    ]),

  });

