import { Country } from "country-state-city";

const CountrySelect = ({ onChange, form }) => {
  const countries = Country.getAllCountries();

  return (
    <>
      <div>
        <label htmlFor="countrySelect" className="sr-only">
          Country Select
        </label>
        <select
          onChange={onChange}
          id="countrySelect"
          className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
        >
          <option defaultValue={"Choose a country"}>Choose a country</option>
          {countries.map((country, index) => (
            <>
              <option key={index} value={country.name}>
                {country.name} {country.flag}
              </option>
            </>
          ))}
        </select>
      </div>
    </>
  );
};

export default CountrySelect;
