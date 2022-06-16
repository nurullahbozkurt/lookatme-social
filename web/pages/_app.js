import "../styles/globals.css";
import { AuthProvider } from "../states/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { TimelineProvider } from "../states/timeline";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
const queryClient = new QueryClient();
const AppContext = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TimelineProvider>
          <MyApp {...props} />
        </TimelineProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
};

export default AppContext;
