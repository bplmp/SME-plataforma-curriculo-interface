import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL } from '../../constants';
import ActivityActions from '../../actions/ActivityActions';
import GenericItem from '../common/GenericItem';
import convertQuillToHtml from '../util/convertQuillToHtml';
import getActivityTypeIcon from './getActivityTypeIcon';
import getWindowWidth from '../util/getWindowWidth';
import styles from './Activity.css';

let hasPrinted = false;

class ActivityPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onResized() {
    const totalWidth = getWindowWidth();
    this.setState({ totalWidth });
  }

  componentWillMount() {
    this.onResized();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResized.bind(this));
    if (this.props.match) {
      const params = this.props.match.params;
      this.props.load(params.slug1, params.slug2);
    } else {
      this.props.load(this.props.slug1, this.props.slug2);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match) {
      const params = this.props.match.params;
      const prevParams = prevProps.match.params;
      if (params.slug2 !== prevParams.slug2) {
        this.props.load(params.slug1, params.slug2);
      }
    }

    if (!prevProps.data && this.props.data && !hasPrinted) {
      hasPrinted = true;
      setTimeout(window.print, 2000);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResized.bind(this));
  }

  render() {
    if (this.props.data == null) {
      return <span />;
    }

    const data = this.props.data;
    const sequence = data.activity_sequence;

    const filters = [
      <GenericItem key={0} data={{name: sequence.year}} />,
      <GenericItem key={1} data={sequence.main_curricular_component} />,
    ];

    const iconsItems = data.activity_types.map((item, i) => {
      const icon = getActivityTypeIcon(item.name);
      return (
        <li key={i}>
          <img src={icon} alt={item.name} />
          <div>{item.name}</div>
        </li>
      );
    });
    const icons = (
      <ul className={styles.icons}>
        {iconsItems}
      </ul>
    );
    const icons1 = this.state.totalWidth < 768 ? null : icons;
    const icons2 = this.state.totalWidth < 768 ? icons : null;

    const cover = data.image_attributes.default_url ? (
      <div className="container">
        <img
          className={styles.cover}
          src={API_URL + data.image_attributes.default_url}
          srcSet={`${API_URL}${data.image_attributes.large.url}, ${API_URL}${data.image_attributes.extra_large.url} 2x`}
          alt={data.title} />
      </div>
    ) : null;

    const content = convertQuillToHtml(data.content);

    return (
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h3>Atividade {data.sequence}</h3>
            <h1>{data.title}</h1>
            <h2>Sequência didática: {sequence.title}</h2>
            <ul>
              {filters}
            </ul>
          </div>
          <div className={styles.infos}>
            {icons1}
          </div>
        </div>
        {cover}
        {icons2}
        <hr />
        <div className="container">
          <div className="row">
            <div className={styles.description} dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </div>
      </section>
    );
  }
}

ActivityPrint.propTypes = {
  data: PropTypes.object,
  slug1: PropTypes.string,
  slug2: PropTypes.string,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    data: state.ActivityReducer.currActivity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: (slug1, slug2) => {
      dispatch(ActivityActions.load(slug1, slug2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPrint);
