import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        position: 'relative',
        paddingVertical: styles.GUTTER-5,
        paddingHorizontal: styles.GUTTER,
        aspectRatio: 1,
        borderRadius:20,
      },
      props.style && {
        ...props.style
      },
    ]),

    title: StyleSheet.flatten([
      {
        fontSize: styles.GUTTER * 2,
        
      },
    ]),

  });

