import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';

import { AppLayout } from './components';
import { Navigation } from './navigation';
import { theme } from './theme';
import { HashRouter } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
    <PrivyProvider
    appId="clvuzwj1z0f0310k5kk7ulw7c"
    config={{
      
      // Display email and wallet as login methods
      loginMethods: ['email', 'wallet', 'twitter', 'google'],
      // Customize Privy's appearance in your app
      appearance: {
        theme: 'light',
        accentColor: '#676FFF',
        logo: 'https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg',
      },
      // Create embedded wallets for users who don't have a wallet
      embeddedWallets: {
        createOnLogin:  'all-users',
      },
    }}>

      <HashRouter>
        <AppLayout>
          <Navigation />
        </AppLayout>
        </HashRouter>

    </PrivyProvider>
    </MantineProvider>
  );
}
