import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import ButtonIcon from 'app/components/ButtonIcon';

import styles from './styles';
import * as configStyles from 'app/config/style';


export default class BookmarkIcon extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkStatus: false
    }
  }

  static propTypes = {
    article: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    size: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    size: 34
  }

  componentWillMount() {
    this.checkBookmarkStatus()
  }


  render() {
    const { props, state } = this;
    const style = styles(props);

    return (
      <ButtonIcon
        name={"bookmark"}
        color={state.bookmarkStatus ? configStyles.COLOR_3 : configStyles.COLOR_6}
        size={props.size}
        style={props.style}
        onPress={this.onPress}
      />
    )
  }

  checkBookmarkStatus = () => {
    const { favorites, article } = this.props;
    const bookmarkStatus = find(favorites, {
      title: article.title,
      published: article.published,
      lead: article.lead
    }) ? true : false;

    this.setState({
      bookmarkStatus
    });
  }


  onPress = () => {
    const { props, state } = this;

    this.setState({
      bookmarkStatus: !state.bookmarkStatus
    }, () => {
      setTimeout(() => {
        if (typeof props.onPress == 'function') {
          props.onPress();
        }
      }, 0)
    });
  }

}