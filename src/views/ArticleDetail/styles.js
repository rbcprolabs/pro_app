import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        // ...stylesGlobal.container,
        backgroundColor: styles.COLOR_1,
        flex: 1
      }

    ]),

    content: StyleSheet.flatten([
      {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: styles.INTENT,
        paddingBottom: styles.MARGIN * 6,
        paddingHorizontal: styles.INTENT,
      }

    ]),

    close: StyleSheet.flatten([
      {
        position: 'absolute',
        top: styles.MARGIN,
        right: styles.MARGIN,
      }

    ]),

    header: StyleSheet.flatten([
      {
        paddingTop: styles.MARGIN * 3,
        paddingBottom: styles.INTENT + 5,
        paddingHorizontal: styles.INTENT,
        backgroundColor: styles.COLOR_1,
        borderBottomWidth: 1,
        borderColor: styles.COLOR_8
      }

    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE + 4,
        color: styles.COLOR_2,
        fontWeight: '600'
      }

    ]),

    date: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE - 4,
        color: styles.COLOR_7,
        paddingTop: 5
      }

    ]),

    description: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE,
        color: styles.COLOR_2,
      }

    ]),

  });

