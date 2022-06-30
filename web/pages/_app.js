import "../styles/globals.css";
import { AuthProvider } from "../states/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { TimelineProvider } from "../states/timeline";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppContextProvider } from "../states/app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
const queryClient = new QueryClient();
const AppContext = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AuthProvider>
          <TimelineProvider>
            <MyApp {...props} />
          </TimelineProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default AppContext;
