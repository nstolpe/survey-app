import React from 'react';

import Options from 'Components/Options';

const FoodOptions = ({ defaults, setActiveOption }) => (
  <Options defaults={defaults} setActiveOption={setActiveOption} type="food" />
);

export default FoodOptions;
