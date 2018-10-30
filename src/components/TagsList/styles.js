import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        
      },
      props.style && {
        ...props.style
      },
    ]),

  
  });

