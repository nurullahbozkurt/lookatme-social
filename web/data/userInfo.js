import React from "react";

const userInfo = (user, isLoading) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const picUrl = user?.profilePicture + "api";
  const name = user?.name[0].toUpperCase() + user?.name.slice(1);
  const lastname = user?.lastName[0].toUpperCase() + user?.lastName.slice(1);
  const job = user?.job ? user?.job[0].toUpperCase() + user?.job.slice(1) : "";
  const country = user?.country
    ? user?.country[0].toUpperCase() + user?.country.slice(1)
    : "";
  const city = user?.city
    ? user?.city[0].toUpperCase() + user?.city.slice(1)
    : "";
  return { picUrl, name, lastname, job, country, city };
};

export default userInfo;
