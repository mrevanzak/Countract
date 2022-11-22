import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
