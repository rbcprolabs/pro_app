import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';
import themes from 'app/config/themes';

export default props =>
  StyleSheet.create({
    routerContainer: StyleSheet.flatten([
      {
        backgroundColor: styles.COLOR_1
      }

    ]),
    tabsContainer: StyleSheet.flatten([
      {
        paddingTop: styles.SPACE_TOP,
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

