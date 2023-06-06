import React, { useState } from 'react';
import styled from '@emotion/styled';

interface RadioButtonWrapperProps {
  isActive: boolean;
  isFocused: boolean;
  innerColor: string;
  outerColor: string;
}

const RadioButtonWrapper = styled.div<RadioButtonWrapperProps>`
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
  height: 100%;
  width: 100%;
`;

interface CustomRadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  innerColor?: string;
  outerColor?: string;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  innerColor = '#000000',
  outerColor = '#000000',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const radioCallbackRef = (node: HTMLInputElement) =>
    setIsActive(node?.checked ?? false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <RadioButtonWrapper
      innerColor={innerColor}
      outerColor={outerColor}
      isActive={isActive}
      isFocused={isFocused}
    >
      <RadioButton
        {...props}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={radioCallbackRef}
        type="radio"
      />
    </RadioButtonWrapper>
  );
};

export default CustomRadioButton;
