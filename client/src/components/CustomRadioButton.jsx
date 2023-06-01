import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const RadioButtonWrapper = styled.div`
  position: relative;
  height: 1.2rem;
  width: 1.2rem;
  &:before {
    content: '';
    border-radius: 50%;
    border: solid 2px ${({ outerColor }) => outerColor};
    box-shadow: 0 0 4px
      ${({ isFocused }) => (isFocused ? '#000000' : 'transparent')};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &:after {
    content: '';
    border-radius: 50%;
    background-color: ${({ isActive, innerColor }) =>
      isActive ? innerColor : 'transparent'};
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
  }
`;

const RadioButton = styled.input`
  opacity: 0;
`;

const CustomRadioButton = ({ isActive, innerColor, outerColor, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <RadioButtonWrapper
      innerColor={innerColor}
      outerColor={outerColor}
      isActive={isActive}
      isFocused={isFocused}
    >
      <RadioButton {...props} onBlur={onBlur} onFocus={onFocus} />
    </RadioButtonWrapper>
  );
};

CustomRadioButton.propTypes = {
  isActive: PropTypes.bool,
  innerColor: PropTypes.string,
  outerColor: PropTypes.string,
};

CustomRadioButton.defaultProps = {
  isActive: false,
  innerColor: '#000000',
  outerColor: '#000000',
};

export default CustomRadioButton;
