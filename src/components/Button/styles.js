import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    btn: StyleSheet.flatten([
      {
        height: styles.FIELD_HEIGHT,
        paddingLeft: styles.GUTTER,
        paddingRight: styles.GUTTER,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: styles.RADIUS,
        borderColor: styles.COLOR_2,
        backgroundColor: styles.COLOR_2,
        marginBottom: styles.GUTTER
      },

      props.style && {
        ...props.style 
      },

      props.isWhite && {
        backgroundColor: 'transparent',
      },
      props.isGreen && {
        backgroundColor: styles.COLOR_GREEN,
        borderColor: styles.COLOR_GREEN
      }
    ]),

    text: StyleSheet.flatten([
      {
        color: styles.COLOR_1,
        fontSize: styles.FONT_SIZE,
        fontWeight: '500',
      },
      props.isWhite && {
        color: styles.COLOR_3,
      },
      props.styleType == 'big' && {
        fontSize: styles.FONT_SIZE + 2,
      },
      props.isBlue && {
        color: styles.COLOR_BLUE_LIGHT,
        fontWeight: '400',
      }
    ])
  });

