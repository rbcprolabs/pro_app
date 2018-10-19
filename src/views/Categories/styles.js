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
        flexDirection: 'row',
        paddingHorizontal: styles.INTENT / 4,
      }

    ]),

    categoriesItem: StyleSheet.flatten([
      {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '50%',
        paddingHorizontal: styles.INTENT / 4,
        paddingBottom: styles.INTENT / 2
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
        fontSize: styles.FONT_SIZE - 4,
        fontWeight: '500',
        paddingBottom: styles.INTENT - 10
      }

    ]),

    topPart: StyleSheet.flatten([
      {
        paddingHorizontal: styles.INTENT,
        paddingTop: styles.INTENT * 3,
        paddingBottom: styles.INTENT,
      }

    ]),

    bottomPart: StyleSheet.flatten([
      {
        paddingHorizontal: styles.INTENT + 4,
        paddingTop: styles.INTENT,
        paddingBottom: styles.INTENT * 2
      }

    ]),

  });

