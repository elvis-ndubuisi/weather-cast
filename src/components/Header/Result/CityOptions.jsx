import { useContext } from "react";
import { useFetch } from "../../../hooks/useFetch.js";
import { ResultContext } from "../../../contexts/resultContext.js";
import styled from "styled-components";

const StyledCityOptionWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent; // TODO: change background color.
  display: grid;
  place-items: center;

  > div {
    max-width: 900px;
    padding: var(--spacing-base);
    background-color: var(--color-background); // TODO: change background-color.
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-base-mobile);
  }
`;

const StyledCityOption = styled.div`
  background-color: white; // TODO: change background color.

  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  padding: var(--padding-vertical) var(--padding-horizontal);
  border-radius: var(--border-radius);
  border: solid var(--button-border-width) var(--color-dark);
  box-shadow: 0 var(--button-shadow-width) 0 var(--color-dark);
  background-color: var(--color-red-03);
  transition: all 50ms ease-in-out;
  margin-bottom: var(--spacing-base-mobile);
  margin-top: 0;

  :focus-within,
  :hover {
    background-color: var(--color-light);
  }
  :active {
    margin-bottom: 0;
    margin-top: var(--spacing-base-mobile);
    box-shadow: none;
  }
`;

export const CityOptions = () => {
  const { response, isFetching, setQueryString, queryString } =
    useContext(ResultContext);

  const sendCityFocast = (event) => {
    let text = event.target.innerText;
    // Check if string matches values in response array.
    response.forEach((city) => {
      if (
        text.includes(city.name) &&
        text.includes(city.state) &&
        text.includes(city.country)
      ) {
        setQueryString(
          `https://genesisrack.herokuapp.com/weather/api/focast?lat=${city.lat}&lon=${city.lon}&state=${city.state}`
        );
      } else {
        return;
      }
    });
  };

  useFetch(queryString);

  return (
    <StyledCityOptionWrapper>
      <div>
        {isFetching === false &&
          response.map((city, index) => (
            <StyledCityOption
              key={city.lat + city.name}
              onClick={sendCityFocast}
            >
              {city.state ? (
                <p>
                  {city.name} in {city.state} State in {city.country} ?
                </p>
              ) : (
                <p>
                  {city.name} in {city.country} ?
                </p>
              )}
            </StyledCityOption>
          ))}
      </div>
    </StyledCityOptionWrapper>
  );
};
