import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    wrap: StyleSheet.flatten([
      {
        position: 'relative',
        paddingTop: styles.INTENT,
        paddingBottom: styles.INTENT + 4,
        paddingHorizontal: styles.INTENT + 4,
        backgroundColor: styles.COLOR_1,
        marginBottom: styles.INTENT,
        borderBottomRightRadius: styles.RADIUS,
        borderBottomLeftRadius: styles.RADIUS,
        flexBasis: '100%'
      },
      props.data.theme == 'dark' && {
        backgroundColor: styles.COLOR_2,
      },
      props.style && {
        ...props.style
      },
    ]),

    globalContainer: StyleSheet.flatten([
      {
        flexBasis: '100%',
        borderRadius: styles.RADIUS,
        overflow: 'hidden'
      },
    ]),

    header: StyleSheet.flatten([
      {
        flexDirection: 'row',
        paddingRight: styles.INTENT * 2,
        marginBottom: styles.INTENT
      },
    ]),

    headerText: StyleSheet.flatten([
      {
        color: styles.COLOR_4,
        fontSize: styles.FONT_SIZE - 6,
        textTransform: 'uppercase',
        fontWeight: '500',
      },
    ]),

    headerLine: StyleSheet.flatten([
      {
        width: 5,
        marginRight: 5,
        borderRadius: 1.5,
        backgroundColor: styles.COLOR_2,
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 5,
        fontWeight: '600',
        color: styles.COLOR_2,
        marginTop: 4
      },
      props.data.theme == 'dark' && {
        color: styles.COLOR_1,
      },
    ]),

    subTitle: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE - 4,
        color: styles.COLOR_7,
        marginTop: 5
      },
    ]),

    description: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
        paddingTop: styles.INTENT
      },
    ]),

    descriptionСontainer: StyleSheet.flatten([
      {
        paddingTop: styles.INTENT,
      },
    ]),

    descriptionItem: StyleSheet.flatten([
      {
        flexShrink: 1,
        flexGrow: 1
      },
    ]),

    descriptionCount: StyleSheet.flatten([
      {
        fontSize: 48,
        fontWeight: '900',
        color: styles.COLOR_4,
        paddingLeft: styles.INTENT,
        flexShrink: 0,
        flexGrow: 0
      },
    ]),

    descriptionList: StyleSheet.flatten([
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: styles.COLOR_2,
        borderStyle: 'dashed',
        marginTop: styles.INTENT

      },
    ]),

    bookmark: StyleSheet.flatten([
      {
        position: 'absolute',
        right: -7,
        top: -5
      },
    ]),

    topViewContainer: StyleSheet.flatten([
      {
        marginBottom: styles.INTENT * 2
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

    firstDescriptionItem: StyleSheet.flatten([
      {
        borderWidth: 0,
        marginTop: 0
      },
    ]),

    tagTop: StyleSheet.flatten([
      {
        position: 'absolute',
        left: styles.INTENT - 4,
        top: styles.INTENT / 2,
      },
    ]),

  });

