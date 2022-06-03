import React, { useState, useMemo } from "react";
import { useAuth } from "../../states/auth";
import { Country, State, City } from "country-state-city";
import { GoLocation } from "react-icons/go";
import { useTimeline } from "../../states/timeline";

const LocalSelect = () => {
  const { user } = useAuth();
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
      {user.country && (
        <div className="text-sm">
          <h1 className="text-gray-500">
            {user.country}, {user.city}
          </h1>
        </div>
      )}
      {!user.country && (
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
                {countries.map((country) => (
                  <>
                    <option value={country.name}>{country.name}</option>
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
                {selectCity?.map((city) => (
                  <>
                    <option value={city.name}>{city.name}</option>
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
