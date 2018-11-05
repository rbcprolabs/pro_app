import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_1,
        flex: 1,
      }

    ]),

    content: StyleSheet.flatten([
      {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: styles.INTENT,
        paddingBottom: styles.IS_IPHONE_X ? styles.SPACE_BOTTOM : styles.INTENT,
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
        paddingTop: styles.MARGIN,
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
        flexBasis: '100%',
        marginBottom: 20
      }

    ]),

    blockquote: StyleSheet.flatten([
      {
        fontSize: styles.FONT_SIZE-2,
        color: styles.COLOR_2,
        fontStyle: 'italic',
        flexBasis: '100%',
      }

    ]),

    author: StyleSheet.flatten([
      {
        fontStyle: 'normal',
        marginBottom: 0,
      }
    ]),

  });

