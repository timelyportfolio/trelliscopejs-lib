import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { uiConstsSelector, windowWidthSelector } from '../selectors';
import { JSONFilterCardinalitySelector } from '../selectors/cogInterface.js';
import { displayInfoSelector } from '../selectors/display.js';
import FooterChip from './FooterChip';

const Footer = ({ style, sortNames, filterNames, nFilt, nPanels }) => {
  let sortContent = '';
  let filterContent = '';
  let spacerContent = '';

  if (sortNames.length > 0) {
    sortContent = (
      <div style={style.sectionWrapper}>
        <div style={style.sectionText}>
          Active sort variables:
        </div>
        <div style={style.chipWrapper}>
          {sortNames.map((el) => (
            <FooterChip
              key={`${el}_sortchip`}
              label={el}
            />
          ))}
        </div>
      </div>
    );
  }

  if (filterNames.length > 0) {
    filterContent = (
      <div style={style.sectionWrapper}>
        <div style={style.sectionText}>
          Active filter variables:
        </div>
        <div style={style.chipWrapper}>
          {filterNames.map((el) => (
            <FooterChip
              key={`${el}_filterchip`}
              label={el}
            />
          ))}
        </div>
        <div style={style.filterText}>
          ({nFilt} of {nPanels} panels)
        </div>
      </div>
    );
  }

  if (filterNames.length > 0 && sortNames.length > 0) {
    spacerContent = <div style={style.spacer}></div>;
  }

  return (
    <div style={style.wrapper}>
      {sortContent}
      {spacerContent}
      {filterContent}
    </div>
  );
};

Footer.propTypes = {
  style: React.PropTypes.object,
  sortNames: React.PropTypes.array,
  filterNames: React.PropTypes.array,
  nFilt: React.PropTypes.number,
  nPanels: React.PropTypes.number
};

// ------ redux container ------

const sortSelector = state => state.sort;

const sortNamesSelector = createSelector(
  sortSelector,
  (sort) => {
    const names = [];
    for (let i = 0; i < sort.length; i++) {
      names.push(sort[i].name);
    }
    return names;
  }
);

const filterSelector = state => state.filter;

const filterNamesSelector = createSelector(
  filterSelector,
  filter => Object.keys(filter.state)
);

const styleSelector = createSelector(
  windowWidthSelector, uiConstsSelector, sortNamesSelector, filterNamesSelector,
  JSONFilterCardinalitySelector, displayInfoSelector,
  (ww, ui, sortNames, filterNames, nFilt, di) => ({
    style: {
      wrapper: {
        position: 'absolute',
        boxSizing: 'border-box',
        bottom: 0,
        left: 0,
        width: ww,
        height: ui.footer.height,
        paddingLeft: 10,
        margin: 0,
        lineHeight: `${ui.footer.height}px`,
        fontSize: ui.footer.height * 0.5,
        fontWeight: 300,
        background: ui.footer.background,
        color: ui.footer.color,
        display: 'flex',
        flexDirection: 'row'
      },
      sectionWrapper: {
        display: 'flex',
        flexDirection: 'row'
      },
      chipWrapper: {
        display: 'flex',
        flexDirection: 'row'
      },
      sectionText: {
        marginRight: 3
      },
      spacer: {
        width: 12
      },
      filterText: {
        marginLeft: 5
      }
    },
    sortNames,
    filterNames,
    nFilt,
    nPanels: di.info.n
  })
);

const mapStateToProps = (state) => (
  styleSelector(state)
);

export default connect(
  mapStateToProps
)(Footer);
