import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        // marginTop: 160
        // ...stylesGlobal.container,
        flex: 1
      }

    ]),

    categoriesContainer: StyleSheet.flatten([
      {
        flexWrap: 'wrap',
        flexDirection: 'row'
      }

    ]),

    categoriesItem: StyleSheet.flatten([
      {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '50%',
        paddingHorizontal: 5,
        paddingBottom: 10
      }

    ]),

    title: StyleSheet.flatten([
      {
        color: styles.COLOR_2,
        fontSize: styles.FONT_SIZE * 2,
        fontWeight: '700'
      }

    ]),

    subTitle: StyleSheet.flatten([
      {
        textTransform: 'uppercase',
        color: styles.COLOR_4,
        fontSize: styles.FONT_SIZE,
        paddingBottom: styles.GUTTER - 10
      }

    ]),

    topPart: StyleSheet.flatten([
      {
        paddingHorizontal: styles.GUTTER,
        paddingTop: styles.GUTTER * 3,
        paddingBottom: styles.GUTTER,
      }

    ]),

    bottomPart: StyleSheet.flatten([
      {
        paddingHorizontal: styles.GUTTER,
        paddingTop: styles.GUTTER,
        paddingBottom: styles.GUTTER * 2
      }

    ]),

  });

