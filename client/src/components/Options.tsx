import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';

import CustomRadioButton from 'Components/CustomRadioButton';

const OptionsWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const OtherInputWrapper = styled.span`
  position: relative;
  width: 100%;
`;

const OtherInput = styled.input`
  font-size: 1.2rem;
  outline: none;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(0, 0, 0);
  border-radius: 4px;
  padding: 0 0.5em;
  width: 100%;
  transition: border-color 0.3s ease;
  &:disabled {
    border-color: rgb(180, 180, 180);
  }
`;

const OptionName = styled.span`
  font-family: sans-serif;
  font-size: 1.2rem;
`;

// overlays the other text input when it's disabled so it
// can be activated and focused when clicked
const DisabledOtherInputClickInterceptor = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export interface OptionsProps {
  defaults?: {
    id: string;
    name: string;
  }[];
  type: string;
  setActiveOption: (option: string | null) => void;
}

const Options: React.FC<OptionsProps> = ({
  defaults = [],
  type,
  setActiveOption,
}) => {
  const [otherActive, setOtherActive] = useState(false);
  const otherInputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const optionOtherId = `${type}-option-other`;

  const onOptionSelect = (event: React.PointerEvent<HTMLInputElement>) => {
    setOtherActive(false);
    setActiveOption((event.target as HTMLInputElement).value);
  };
  const onOtherOptionSelect = () => {
    setOtherActive(true);
    setActiveOption(otherInputRef?.current?.value || null);
  };
  const onOtherOptionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveOption(event.target.value || null);
  };

  // shift focus to the other text input when it's activated.
  useEffect(() => {
    if (otherActive == true && otherInputRef.current !== null) {
      otherInputRef.current.focus();
    }
  }, [otherActive]);

  return (
    <OptionsWrapper>
      {defaults.map(({ name, id }) => {
        const optionId = `${type}-option-${id}`;
        return (
          <Label htmlFor={optionId} key={id}>
            <CustomRadioButton
              name={`${type}-option`}
              value={name}
              id={optionId}
              onClick={onOptionSelect}
              data-testid={name}
            />
            <OptionName>{name}</OptionName>
          </Label>
        );
      })}
      <Label htmlFor={`${type}-option-other`} key={`${type}-option-other`}>
        <CustomRadioButton
          name={`${type}-option`}
          id={optionOtherId}
          onClick={onOtherOptionSelect}
          data-testid={optionOtherId}
        />
        <OtherInputWrapper>
          <OtherInput
            type="text"
            onChange={debounce(onOtherOptionTextChange, 100)}
            disabled={!otherActive}
            ref={otherInputRef}
            placeholder={`Enter a custom ${type}`}
            data-testid="other-input"
          />
          {!otherActive && (
            <DisabledOtherInputClickInterceptor data-testid="disabled-other-input-click-interceptor" />
          )}
        </OtherInputWrapper>
      </Label>
    </OptionsWrapper>
  );
};

export default Options;
