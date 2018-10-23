import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    routerContainer: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_1
      }

    ]),
    tabsContainer: StyleSheet.flatten([
      {
        marginTop: 30,
        backgroundColor: styles.COLOR_1
      }

    ]),

    tab: StyleSheet.flatten([
      {
        //  backgroundColor: '',
        padding: 0,
        height: 46
      }

    ]),

    tabLabel: StyleSheet.flatten([
      {
        color: styles.COLOR_2,
        fontSize: styles.FONT_SIZE,
        fontWeight: '500',
        textTransform: 'capitalize',
        padding: 0
      }

    ]),

    tabActiveIndicator: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_2
      }

    ]),

  });

