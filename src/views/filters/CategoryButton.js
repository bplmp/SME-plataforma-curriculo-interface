import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import FiltersActions from '../../actions/FiltersActions.js'
import styles from './CategoryButton.css';

class CategoryButton extends Component {
  onClicked() {
    this.props.showCategory(this.props.data);
  }

  render() {
    return (
      <li>
        <button className={styles.wrapper} onClick={this.onClicked.bind(this)}>
          {this.props.data.label}
          <i className="fa fa-chevron-right" />
        </button>
      </li>
    );
  }
}

CategoryButton.propTypes = {
  data: PropTypes.object.isRequired,
  showCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    showCategory: data => {
      dispatch(FiltersActions.showCategory(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CategoryButton);