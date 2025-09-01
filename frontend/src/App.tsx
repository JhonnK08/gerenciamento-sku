import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { SkuPage } from './pages/Sku';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <SkuPage />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
