import { StyleSheet } from 'react-native';
import * as styles from 'app/config/style';

export default props =>
  StyleSheet.create({
    container: StyleSheet.flatten([
      {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: styles.MARGIN
      },
      props.type == 'ellipse' && {
        marginTop: 0,
        borderRadius: styles.RADIUS * 2,
        backgroundColor: styles.COLOR_2,
        height: 32,
        paddingHorizontal: styles.INTENT-4,
        alignItems: 'center'
      },
      props.style && {
        ...props.style
      },
    ]),

    icon: StyleSheet.flatten([
      {
        marginRight: 5
      },
    ]),

    text: StyleSheet.flatten([
      {
        fontSize: styles.FORN_SIZE - 2,
        color: styles.COLOR_4,
        marginTop: 1
      },
      props.active && {
        fontWeight: '500',
        color: styles.COLOR_2
      },
      props.convert || props.type == 'ellipse' && {
        color: styles.COLOR_1
      },
      props.type == 'ellipse' && {
        fontSize: styles.FORN_SIZE - 2,
        fontWeight: '500',
        marginTop: 0
      },
      props.description && {
        fontWeight: '500',
        paddingBottom: 5
      },
    ]),

    description: StyleSheet.flatten([
      {
        fontSize: styles.FORN_SIZE - 4,
        color: styles.COLOR_4,
      },
      props.active && {
        color: styles.COLOR_2
      },
      props.convert || props.type == 'ellipse' && {
        color: styles.COLOR_1
      },
    ]),
  });

