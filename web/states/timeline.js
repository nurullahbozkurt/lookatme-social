import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "./auth";

const TimelineContext = createContext();
const useTimeline = () => useContext(TimelineContext);

const TimelineProvider = ({ children }) => {
  const { user, userLoaded } = useAuth();

  const userCountry = user?.country ? user.country : "";

  const userCity = user?.city ? user.city : "";

  const [location, setLocation] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    setLocation({ ...location, country: userCountry, city: userCity });
  }, [userLoaded, user]);

  return (
    <TimelineContext.Provider value={{ location, setLocation }}>
      {children}
    </TimelineContext.Provider>
  );
};
export { TimelineProvider, useTimeline };
