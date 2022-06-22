import Layout from "../components/Layout";
import Sidebar from "../components/sidebar/Sidebar";
import AllUsers from "../components/time-line/AllUsers";
import TimeLine from "../components/time-line/TimeLine";

import withProtectedRoute from "./withProtectedRoute";
const Home = () => {
  return (
    <Layout>
      <div>
        <AllUsers />
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-5 lg:space-x-5 py-10">
        <div className="hidden lg:block lg:col-span-1 xl:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-2 xl:col-span-3">
          <TimeLine />
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedRoute(Home);
