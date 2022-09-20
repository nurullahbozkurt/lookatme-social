import React, { useState, useMemo } from "react";
import { useAuth } from "../../states/auth";
import { Country, State, City } from "country-state-city";
import { useTimeline } from "../../states/timeline";

const LocalSelect = () => {
  const { localUser } = useAuth();
  const { location, setLocation } = useTimeline();

  const cities = State.getAllStates();
  const countries = Country.getAllCountries();

  const selectCountry = useMemo(() => {
    return countries.find((item) => item.name === location.country);
  }, [location.country]);

  const selectCity = useMemo(() => {
    return cities
      .filter((item) => item.countryCode === selectCountry?.isoCode)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectCountry]);

  return (
    <div>
      {localUser.country && (
        <div className="text-sm">
          <h1 className="text-gray-500">
            {localUser.country}, {localUser.city}
          </h1>
        </div>
      )}
      {!localUser.country && (
        <>
          <div className="flex items-center border rounded border-primaryBlue overflow-hidden text-sm">
            <div>
              <select
                className="border-none"
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
              >
                <option defaultValue={"Select A Country"}>
                  Select A Country
                </option>
                {countries.map((country, index) => (
                  <>
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div>
              <select
                className="border-none"
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              >
                <option defaultValue={"Select A City"}>Select A City</option>
                {selectCity?.map((city, index) => (
                  <>
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocalSelect;
