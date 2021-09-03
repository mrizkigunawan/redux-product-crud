import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import { AddProduct } from "./pages/AddProduct";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/add" render={() => <AddProduct />} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
