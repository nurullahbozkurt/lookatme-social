import { useMemo } from "react";
import { State, Country } from "country-state-city";

const CitySelect = ({ onChange, form }) => {
  const cities = State.getAllStates();
  const countries = Country.getAllCountries();

  const selectCountry = useMemo(() => {
    return countries.find((item) => item.name === form.country);
  }, [form.country]);

  const selectCity = useMemo(() => {
    return cities
      .filter((item) => item.countryCode === selectCountry?.isoCode)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectCountry]);

  return (
    <>
      <div>
        <label htmlFor="citySelect" className="sr-only">
          City Select
        </label>
        <select
          onChange={onChange}
          id="citySelect"
          className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
        >
          <option defaultValue={"Choose a country"}>Choose a country</option>
          {selectCity?.map((city, index) => (
            <>
              <option key={index} value={city.name}>
                {city.name}
              </option>
            </>
          ))}
        </select>
      </div>
    </>
  );
};

export default CitySelect;
