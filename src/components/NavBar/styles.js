import {StyleSheet} from 'react-native';
import * as styles from 'app/config/style';
// import stylesGlobal from 'app/themes/global';

export default props =>
  StyleSheet.create({

    container: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_4_LIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // paddingTop: props.statusBarHeight,
        paddingBottom: 8,
        paddingLeft: 0,
        paddingRight: 0,
        height: props.statusBarHeight + 44,
        // ...stylesGlobal.shadow
      },
      !props.leftContentShow &&
      !props.rightContentShow && {
        justifyContent: 'center',
      },
      props.style && {
        ...props.style
      }

    ]),
    statusBar: StyleSheet.flatten([
      {},

    ]),

    side: StyleSheet.flatten([
      {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 26 + styles.INTENT * 2
      },
      !props.leftContentShow &&
      !props.rightContentShow && {
        flexBasis: 0
      }

    ]),

    center: StyleSheet.flatten([
      {
        flexShrink: 1
      }
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 2,
        color: styles.COLOR_BLACK,
        fontWeight: '700',
        paddingHorizontal: 5,
        textAlign: 'center'
      }
    ]),
    psevdoClick: StyleSheet.flatten([
      {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,

      }
    ]),
  });

