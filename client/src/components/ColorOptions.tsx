import React from 'react';

import Options, { OptionsProps } from 'Components/Options';

const ColorOptions: React.FC<Omit<OptionsProps, 'type'>> = ({
  defaults = [],
  setActiveOption = () => {},
}) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="color" />
);

export default ColorOptions;
