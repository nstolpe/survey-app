import React from 'react';
import PropTypes from 'prop-types';

import Options from 'Components/Options';

const ColorOptions = ({ defaults, setActiveOption }) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="color" />
);

ColorOptions.propTypes = {
  defaults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  setActiveOption: PropTypes.func,
};

ColorOptions.defaultProps = {
  defaults: [],
  setActiveOption: () => {},
};

export default ColorOptions;
