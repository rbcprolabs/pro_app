import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        // ...stylesGlobal.container,
        backgroundColor: styles.COLOR_5,
        flex: 1
      }

    ]),

    content: StyleSheet.flatten([
      {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: styles.INTENT,
        paddingHorizontal: styles.INTENT / 4,
      }

    ]),

  });

