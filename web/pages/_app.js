import "../styles/globals.css";
import { AuthProvider } from "../states/auth";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
const queryClient = new QueryClient();
const AppContext = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyApp {...props} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppContext;
