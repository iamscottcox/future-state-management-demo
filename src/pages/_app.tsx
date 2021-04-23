import { AppProps } from 'next/app';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import reportWebVitals from 'src/reportWebVitals';
import { Page } from 'src/components/Page';

import store from 'src/state';

import 'src/styles.css';

const queryClient = new QueryClient();

export const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
