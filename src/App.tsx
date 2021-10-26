import { BrowserRouter } from "react-router-dom";
import { AppProviders, AppWrapper } from "./components";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppWrapper />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
