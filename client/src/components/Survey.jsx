import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { SubHeading, Title, Wrapper } from 'Components/common';
import GlobalStyles from 'Components/GlobalStyles';
import ColorOptions from 'Components/ColorOptions';
import FoodOptions from 'Components/FoodOptions';
import { DEFAULT_VALUES_URL, RECORD_VOTE_URL } from 'Utility/constants';

const Questions = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  outline: none;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: sans-serif;
  margin: 0 auto;
  padding: 0 1rem;
  line-height: 2em;
  border-radius: 4px;
  border: solid 1px #000000;
  color: #000000;
  background-color: #ffffff;
  transition: all 0.3s ease;
  &:hover:enabled,
  &:focus:enabled {
    color: #ffffff;
    background-color: #000000;
    box-shadow: 0 0 4px #000000;
  }
  &:disabled {
    border-color: rgb(180, 180, 180);
    color: rgb(180, 180, 180);
  }
`;

const Survey = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [defaultColors, setDefaultColors] = useState([]);
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [colorOption, setColorOption] = useState(null);
  const [foodOption, setFoodOption] = useState(null);
  const navigate = useNavigate();

  const recordVote = () => {
    fetch(RECORD_VOTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color: colorOption, food: foodOption }),
    }).then((data) => navigate('/results'));
  };

  useEffect(() => {
    const getDefaultValues = async () => {
      const results = await fetch(DEFAULT_VALUES_URL);
      const defaultValues = await results.json();
      const { colors, foods } = defaultValues;
      setDefaultColors(colors);
      setDefaultFoods(foods);
      setIsLoaded(true);
    };
    getDefaultValues();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Wrapper isVisible={isLoaded}>
        <Title>Favorite Food and Color Survey</Title>
        <Questions>
          <SubHeading>What is your favorite food?</SubHeading>
          <FoodOptions
            defaults={defaultFoods}
            setActiveOption={setFoodOption}
          />
          <SubHeading>What is your favorite color?</SubHeading>
          <ColorOptions
            defaults={defaultColors}
            setActiveOption={setColorOption}
          />
          <SubmitButton
            type="submit"
            onClick={recordVote}
            disabled={colorOption === null || foodOption === null}
          >
            Submit Survey
          </SubmitButton>
        </Questions>
      </Wrapper>
    </>
  );
};

export default Survey;
