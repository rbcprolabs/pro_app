import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    player: StyleSheet.flatten([
      {
        alignSelf: 'stretch', 
        height: 188,
        borderRadius: styles.RADIUS
      },
      props.style && {
        ...props.style
      },
    ])
  });

