import { AppProvider } from "./component/Auth/AuthContext";
import { ProductProvider } from "./component/Auth/Product";
import Index from "./index";
export default function App() {
  return (
    <AppProvider>
      <ProductProvider>
      <Index />
      </ProductProvider>
      
    </AppProvider>
  );
}
