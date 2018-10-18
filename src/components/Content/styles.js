import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({

    container: StyleSheet.flatten([
      {
        marginTop: 0,
        flex: 1,
      },
      props.style && {
        ...props.style
      },

      props.disableMargin && {
        marginTop: 0
      }

    ])
  });

