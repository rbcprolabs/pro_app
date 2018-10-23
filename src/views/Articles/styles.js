import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        paddingTop: 40,
        // ...stylesGlobal.container,
        backgroundColor: styles.COLOR_5,
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

  });

