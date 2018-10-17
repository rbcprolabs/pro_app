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

    text: StyleSheet.flatten([
      {
        color: '#fff',
        fontSize: 20
      }

    ]),

  });

