import { StyleSheet } from 'react-native';
import themes from 'app/config/themes';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_5, 
        flex: 1
      }

    ]),

    content: StyleSheet.flatten([
      {
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // paddingTop: styles.INTENT*2,
        paddingHorizontal: styles.INTENT / 4,
        paddingBottom: styles.SPACE_BOTTOM
      }

    ]),

    firstArticle: StyleSheet.flatten([
      {
        marginTop: styles.INTENT,
      }

    ]),

  });

