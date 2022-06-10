import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "./auth";

const TimelineContext = createContext();
const useTimeline = () => useContext(TimelineContext);

const TimelineProvider = ({ children }) => {
  const { localUser, userLoaded } = useAuth();

  const userCountry = localUser?.country ? localUser.country : "";

  const userCity = localUser?.city ? localUser.city : "";

  const [location, setLocation] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    setLocation({ ...location, country: userCountry, city: userCity });
  }, [userLoaded, localUser]);

  return (
    <TimelineContext.Provider value={{ location, setLocation }}>
      {children}
    </TimelineContext.Provider>
  );
};
export { TimelineProvider, useTimeline };
