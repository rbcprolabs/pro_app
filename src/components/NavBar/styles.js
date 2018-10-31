import {StyleSheet} from 'react-native';
import * as styles from 'app/config/style';
// import stylesGlobal from 'app/themes/global';

export default props =>
  StyleSheet.create({

    container: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: styles.INTENT*2,
        borderBottomWidth: 1,
        borderColor: styles.COLOR_8

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

    icon: StyleSheet.flatten([
      {
        padding: styles.INTENT-4,

      }
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
        paddingHorizontal: 5,
        textAlign: 'center'
      }
    ]),
  });

