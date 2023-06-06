import React from 'react';

import Options, { OptionsProps } from 'Components/Options';

const FoodOptions: React.FC<Omit<OptionsProps, 'type'>> = ({
  defaults = [],
  setActiveOption = () => {},
}) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="food" />
);

export default FoodOptions;
