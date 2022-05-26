import "../styles/globals.css";
import { AuthProvider } from "../states/auth";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

const AppContext = (props) => {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
};

export default AppContext;
