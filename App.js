import { AppProvider } from "./component/Auth/AuthContext";
import Index from "./index";
export default function App() {
  return (
    <AppProvider>
      <Index />
    </AppProvider>
  );
}
