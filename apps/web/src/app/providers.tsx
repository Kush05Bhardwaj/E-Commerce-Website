import { PropsWithChildren, useMemo } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store";
import { ThemeProvider } from "@/app/theme";

export const AppProviders = ({ children }: PropsWithChildren) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

