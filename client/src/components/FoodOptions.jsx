import React from 'react';
import PropTypes from 'prop-types';

import Options from 'Components/Options';

const FoodOptions = ({ defaults, setActiveOption }) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="food" />
);

FoodOptions.propTypes = {
  defaults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  setActiveOption: PropTypes.func,
};

FoodOptions.defaultProps = {
  defaults: [],
  setActiveOption: () => {},
};

export default FoodOptions;
