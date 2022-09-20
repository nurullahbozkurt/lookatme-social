import React from "react";

const userInfo = (user, isLoading) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const picUrl = user?.profilePicture + "api";
  const name = user?.name[0].toUpperCase() + user?.name.slice(1);
  const lastname = user?.lastName[0].toUpperCase() + user?.lastName.slice(1);
  const desc = user?.desc
    ? user?.desc[0].toUpperCase() + user?.desc.slice(1)
    : null;
  const job = user?.job
    ? user?.job[0].toUpperCase() + user?.job.slice(1)
    : null;
  const country = user?.country
    ? user?.country[0].toUpperCase() + user?.country.slice(1)
    : null;
  const city = user?.city
    ? user?.city[0].toUpperCase() + user?.city.slice(1)
    : null;
  return { picUrl, name, lastname, job, country, city, desc };
};

export default userInfo;
