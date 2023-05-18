import { AppProvider } from "./component/Auth/AuthContext";
import { ProductProvider } from "./component/Auth/Product";
import { CountProductInCart } from "./component/Auth/QuatityInCart";
import Index from "./index";
export default function App() {
  return (
    <AppProvider>
      <ProductProvider>
        <CountProductInCart>
          <Index />
        </CountProductInCart>
      </ProductProvider>
    </AppProvider>
  );
}
