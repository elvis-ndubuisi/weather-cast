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
  background-color: transparent;
  display: grid;
  place-items: center;

  > div:first-child {
    max-width: 900px;
    padding: var(--spacing-base);
    background-color: var(--color-grey);
    border-radius: var(--border-radius);
    border: solid 2px var(--color-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-base-mobile);
  }
`;

const StyledCityOption = styled.div`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  padding: var(--padding-vertical) var(--padding-horizontal);
  border-radius: var(--border-radius);
  border: solid var(--button-border-width) var(--color-dark);
  box-shadow: 0 var(--button-shadow-width) 0 var(--color-dark);
  background-color: var(--color-azure);
  transition: all 50ms ease-in-out;
  margin-bottom: var(--spacing-base-mobile);
  margin-top: 0;

  :focus-within,
  :hover {
    background-color: var(--color-grey);
  }
  :active {
    margin-bottom: 0;
    margin-top: var(--spacing-base-mobile);
    box-shadow: none;
  }
`;

export const CityOptions = () => {
  const {
    response,
    isFetching,
    setQueryString,
    queryString,
    setShowCityOptions,
  } = useContext(ResultContext);

  const hideCityOptions = (event) => {
    if (event.target.nodeName === "SECTION") setShowCityOptions(false);
  };

  const sendCityForecast = async (event) => {
    event.preventDefault();
    let text = event.target.innerText;
    // Check if string matches values in response array.
    await response.forEach((city) => {
      if (
        (text.includes(city.name) && text.includes(city.country)) ||
        (text.includes(city.name) &&
          text.includes(city.country) &&
          text.includes(city.state))
      ) {
        setQueryString(
          `https://genesisrack.herokuapp.com/api/weather/forecast?lat=${city.lat}&lon=${city.lon}&state=${city.state}`
        );
      } else {
        setShowCityOptions(false);
      }
    });
  };

  useFetch(queryString);

  return (
    <StyledCityOptionWrapper onClick={hideCityOptions}>
      <div>
        {isFetching === false &&
          response.map((city, index) => (
            <StyledCityOption key={city.lat + index} onClick={sendCityForecast}>
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
