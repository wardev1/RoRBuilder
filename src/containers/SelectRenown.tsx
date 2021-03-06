import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/SelectRenown.module.css';
import { calculateMasteryPoints } from '../helpers/points';

import { State } from '../reducers';
import { setRenown } from '../actions/actionRenown';
import { setPoints } from '../actions/actionPoints';
import { setCurrentPoints } from '../actions/actionCurrentPoints';
import { resetSelectedMorale1 } from '../actions/actionSelectedMorale1';
import { resetSelectedMorale2 } from '../actions/actionSelectedMorale2';
import { resetSelectedMorale3 } from '../actions/actionSelectedMorale3';
import { resetSelectedMorale4 } from '../actions/actionSelectedMorale4';
import { resetSelectedTactics } from '../actions/actionSelectedTactics';
import { resetPathMeterA } from '../actions/actionPathMeterA';
import { resetPathMeterB } from '../actions/actionPathMeterB';
import { resetPathMeterC } from '../actions/actionPathMeterC';
import { resetMasteryAbilities } from '../actions/actionMasteryAbilities';
import { resetMasteryMorales } from '../actions/actionMasteryMorales';
import { resetMasteryTactics } from '../actions/actionMasteryTactics';

type Props = {
  renown: number;
  level: number;
  pathMeterA: number;
  pathMeterB: number;
  pathMeterC: number;
  masteryAbilities: number[];
  masteryMorales: number[];
  masteryTactics: number[];
  setRenown: (
    level: number,
  ) => {
    type: string;
    payload: number;
  };
  setPoints: (
    points: number,
  ) => {
    type: string;
    payload: number;
  };
  setCurrentPoints: (
    points: number,
  ) => {
    type: string;
    payload: number;
  };
  resetSelectedMorale1: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale2: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale3: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale4: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedTactics: () => {
    type: string;
    payload: never[];
  };
  resetPathMeterA: () => {
    type: string;
  };
  resetPathMeterB: () => {
    type: string;
  };
  resetPathMeterC: () => {
    type: string;
  };
  resetMasteryAbilities: () => {
    type: string;
    payload: never[];
  };
  resetMasteryMorales: () => {
    type: string;
    payload: never[];
  };
  resetMasteryTactics: () => {
    type: string;
    payload: never[];
  };
};

class SelectRenown extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.changeRenown = this.changeRenown.bind(this);
  }

  changeRenown(event: React.ChangeEvent<HTMLSelectElement>) {
    const {
      level,
      renown,
      pathMeterA,
      pathMeterB,
      pathMeterC,
      masteryAbilities,
      masteryMorales,
      masteryTactics,
    } = this.props;
    const newRenown = Number(event.target.value);

    this.props.setRenown(newRenown);
    this.props.setPoints(calculateMasteryPoints(level, newRenown));

    // Reset selections
    if (newRenown < renown) {
      this.props.resetSelectedMorale1();
      this.props.resetSelectedMorale2();
      this.props.resetSelectedMorale3();
      this.props.resetSelectedMorale4();
      this.props.resetSelectedTactics();
      this.props.resetPathMeterA();
      this.props.resetPathMeterB();
      this.props.resetPathMeterC();
      this.props.resetMasteryAbilities();
      this.props.resetMasteryMorales();
      this.props.resetMasteryTactics();
      this.props.setCurrentPoints(calculateMasteryPoints(level, newRenown));
    } else {
      this.props.setCurrentPoints(
        calculateMasteryPoints(level, newRenown) -
          (pathMeterA +
            pathMeterB +
            pathMeterC +
            masteryAbilities.length +
            masteryMorales.length +
            masteryTactics.length),
      );
    }

    // TODO address the functions below
    // this.props.updateMasteryPoints();
  }

  render() {
    const { renown } = this.props;

    return (
      <div className={css.container}>
        <label className={css.label} htmlFor="renownSelect">
          Renown rank
        </label>
        <select
          onChange={this.changeRenown}
          className={css.select}
          id="renownSelect"
          value={renown}
        >
          <option value="40">40+</option>
          <option value="50">50+</option>
          <option value="60">60+</option>
          <option value="70">70+</option>
          <option value="10">&lt; 40</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps({
  level,
  renown,
  pathMeterA,
  pathMeterB,
  pathMeterC,
  masteryAbilities,
  masteryMorales,
  masteryTactics,
}: State) {
  return {
    level,
    renown,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    masteryAbilities,
    masteryMorales,
    masteryTactics,
  };
}

export default connect(
  mapStateToProps,
  {
    setRenown,
    setPoints,
    setCurrentPoints,
    resetSelectedMorale1,
    resetSelectedMorale2,
    resetSelectedMorale3,
    resetSelectedMorale4,
    resetSelectedTactics,
    resetPathMeterA,
    resetPathMeterB,
    resetPathMeterC,
    resetMasteryAbilities,
    resetMasteryMorales,
    resetMasteryTactics,
  },
)(SelectRenown);
