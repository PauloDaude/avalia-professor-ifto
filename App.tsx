import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
