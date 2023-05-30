import React from 'react';

import Options from 'Components/Options';

const ColorOptions = ({ defaults, setActiveOption }) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="color" />
);

export default ColorOptions;
