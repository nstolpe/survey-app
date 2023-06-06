import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { SubHeading, Title, Wrapper } from 'Components/common';
import GlobalStyles from 'Components/GlobalStyles';
import { SURVEY_RESULTS_URL } from 'Utility/constants';

const Table = styled.div`
  display: table;
  width: 50%;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: table-row;
`;

const Cell = styled.div`
  display: table-cell;
  font-size: 1.2rem;
  font-family: sans-serif;
  &:first-of-type {
    width: 80%;
  }
  &:last-of-type {
    width: 20%;
    text-align: center;
  }
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const SurveyLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-family: sans-serif;
  font-weight: bold;
  margin: 0 auto;
  padding: 0 1rem;
  line-height: 2em;
  border-radius: 4px;
  border: solid 1px #000000;
  color: #000000;
  background-color: #ffffff;
  transition: all 0.3s ease;
  &:hover,
  &:focus {
    color: #ffffff;
    background-color: #000000;
    box-shadow: 0 0 4px #000000;
  }
`;

const Results: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [colors, setColors] = useState<SurveyData[]>([]);
  const [foods, setFoods] = useState<SurveyData[]>([]);

  useEffect(() => {
    const getSurveyResults = async () => {
      const results = await fetch(SURVEY_RESULTS_URL);
      const data = await results.json();
      const { colors, foods } = data;
      setColors(colors);
      setFoods(foods);
      setIsLoaded(true);
    };
    getSurveyResults();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Wrapper isVisible={isLoaded}>
        <Title>Favorite Food and Color Survey Results</Title>
        <SubHeading>Food Results</SubHeading>
        <Table>
          <Row>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Votes</HeaderCell>
          </Row>
          {foods.map((food) => (
            <Row key={food.id}>
              <Cell>{food.name}</Cell>
              <Cell>{food.votes}</Cell>
            </Row>
          ))}
        </Table>
        <SubHeading>Color Results</SubHeading>
        <Table>
          <Row>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Votes</HeaderCell>
          </Row>
          {colors.map((color) => (
            <Row key={color.id}>
              <Cell>{color.name}</Cell>
              <Cell>{color.votes}</Cell>
            </Row>
          ))}
        </Table>
        <SurveyLink to="/">Take the survey again!</SurveyLink>
      </Wrapper>
    </>
  );
};

export default Results;
