import { ThemeProvider } from '@/components/ThemeProvider';
import { SkuPage } from './pages/Sku';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SkuPage />
    </ThemeProvider>
  );
}

export default App;
