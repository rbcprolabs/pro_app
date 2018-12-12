import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    wrap: StyleSheet.flatten([
      {
        position: 'relative',
        paddingTop: styles.INTENT,
        paddingBottom: styles.MARGIN,
        paddingHorizontal: styles.MARGIN,
        backgroundColor: styles.COLOR_1,
        marginBottom: styles.INTENT,
        borderBottomRightRadius: styles.RADIUS,
        borderBottomLeftRadius: styles.RADIUS,
        flexBasis: '100%'
      },
      props.type == 'selected' && {
        backgroundColor: styles.COLOR_2,
      },
      props.index === 0 && {
        marginTop: styles.INTENT,
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
      props.bookmark && {
        paddingRight: styles.INTENT
      },
      props.type == 'selected' && {
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

    lead: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
        // paddingTop: styles.INTENT
      },
    ]),

    leadСontainer: StyleSheet.flatten([
      {
        paddingTop: styles.INTENT,
      },
    ]),

    leadItem: StyleSheet.flatten([
      {
        flexShrink: 1,
        flexGrow: 1
      },
    ]),

    leadCount: StyleSheet.flatten([
      {
        fontSize: 48,
        fontWeight: '900',
        color: styles.COLOR_4,
        paddingLeft: styles.INTENT,
        flexShrink: 0,
        flexGrow: 0
      },
    ]),

    leadList: StyleSheet.flatten([
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
        top: -5,
        zIndex: 20
      },
    ]),

    topViewContainer: StyleSheet.flatten([
      {
        marginBottom: styles.INTENT * 2
      },
    ]),
  

    tagTop: StyleSheet.flatten([
      {
        position: 'absolute',
        left: styles.PADDING,
        top: styles.INTENT / 2,
      },
    ]),

    video: StyleSheet.flatten([
      {
        marginTop: styles.INTENT
      },
    ]),

  });

