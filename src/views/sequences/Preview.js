import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import DevelopmentGoalItem from '../common/DevelopmentGoalItem'
import KnowledgeMatrixItem from '../common/KnowledgeMatrixItem'
import LearningObjectiveItem from '../common/LearningObjectiveItem'
import styles from './Preview.css';

class Preview extends Component {
  render() {
    const knowledgeMatrices = this.props.data.knowledgeMatrices.map((item, i) => {
      return (
        <KnowledgeMatrixItem key={i} data={item} />
      );
    });

    const learningObjectives = this.props.data.learningObjectives.map((item, i) => {
      return (
        <LearningObjectiveItem key={i} data={item} />
      );
    });

    const developmentGoals = this.props.data.developmentGoals.map((item, i) => {
      return (
        <DevelopmentGoalItem key={i} data={item} />
      );
    });

    const link = `/sequencia/${this.props.data.id}`;

    return (
      <div className={styles.wrapper} style={{height:`${this.props.height}px`}}>
        <div className={styles.scroll}>
          <div className={styles.title}>
            Matriz de Saberes
            <button data-tip data-for="tooltipKnowledgeMatrices">
              <i className="fa fa-question-circle" title="Ajuda" />
            </button>
          </div>
          <ul>
            {knowledgeMatrices}
          </ul>
          <div className={styles.title}>
            Objetivos de Aprendizagem
            <button data-tip data-for="tooltipLearningObjectives">
              <i className="fa fa-question-circle" title="Ajuda" />
            </button>
          </div>
          <ul>
            {learningObjectives}
          </ul>
          <div className={styles.title}>
            Objetivos de Desenvolvimento Sustentável (ODS)
            <button data-tip data-for="tooltipDevelopmentGoals">
              <i className="fa fa-question-circle" title="Ajuda" />
            </button>
          </div>
          <ul>
            {developmentGoals}
          </ul>
        </div>
        <NavLink to={link} className={styles.access}>
          Acessar
        </NavLink>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          id="tooltipKnowledgeMatrices"
          className="tooltip">
          <strong>O que são as matrizes de saberes?</strong>
          <p>O desenvolvimento que procura satisfazer as necessidades da geração atual, sem comprometer a capacidades das gerações futuras de satisfazerem as suas próprias necessidades.</p>
        </ReactTooltip>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          id="tooltipLearningObjectives"
          className="tooltip">
          <strong>O que são os objetivos de aprendizagem?</strong>
          <p>O desenvolvimento que procura satisfazer as necessidades da geração atual, sem comprometer a capacidades das gerações futuras de satisfazerem as suas próprias necessidades.</p>
        </ReactTooltip>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          id="tooltipDevelopmentGoals"
          className="tooltip">
          <strong>O que são os ODS?</strong>
          <p>O desenvolvimento que procura satisfazer as necessidades da geração atual, sem comprometer a capacidades das gerações futuras de satisfazerem as suas próprias necessidades.</p>
        </ReactTooltip>
      </div>
    );
  }
}

Preview.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
};

export default Preview;