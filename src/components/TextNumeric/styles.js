import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    text: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
        // paddingTop: styles.INTENT
      },
    ]),

    container: StyleSheet.flatten([
      {
        paddingTop: styles.INTENT,
      },
    ]),

    // item: StyleSheet.flatten([
    //   {
    //     flexShrink: 1,
    //     flexGrow: 1
    //   },
    // ]),

    itemFirst: StyleSheet.flatten([
      {
        borderWidth: 0,
        marginTop: 0,
        paddingTop: 0
      },
    ]),

    count: StyleSheet.flatten([
      {
        fontSize: 48,
        fontWeight: '900',
        color: styles.COLOR_4,
        paddingLeft: styles.INTENT,
        flexShrink: 0,
        flexGrow: 0
      },
    ]),

    item: StyleSheet.flatten([
      {
        // flexShrink: 1,
        // flexGrow: 1,
        // flexBasis: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        paddingTop: styles.INTENT,
        borderColor: styles.COLOR_2,
        borderStyle: 'dashed',
        marginTop: styles.INTENT,
      },
    ]),

    text: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
        flexShrink: 1,
        flexGrow: 1,
      },
    ]),


    disableLeftBorder: StyleSheet.flatten([
      {
        width: 1,
        backgroundColor: styles.COLOR_1,
        position: 'absolute',
        top: 0,
        left: -1,
        bottom: 0
      },
    ]),

    disableRightBorder: StyleSheet.flatten([
      {
        width: 1,
        backgroundColor: styles.COLOR_1,
        position: 'absolute',
        top: 0,
        right: -1,
        bottom: 0
      },
    ]),

    disableBottomBorder: StyleSheet.flatten([
      {
        height: 2,
        backgroundColor: styles.COLOR_1,
        position: 'absolute',
        bottom: -1,
        left: -1,
        right: -1
      },
    ]),

  });

