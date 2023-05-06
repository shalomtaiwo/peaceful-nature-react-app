import Menu from "./Components/Header/Navbar/Menu";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Main/Pages/Home/HomePage";
import About from "./Components/Main/Pages/About/About";
import Stepper from "./Components/Main/Shop/Cart/Stepper";
import Shop from "./Components/Main/Shop/Shop";
import { CartProvider } from "react-use-cart";
import BottomNav from "./Components/Header/Navbar/Bottom-Nav";
import Account from "./Components/Main/Shop/Account/Account";
import {Footer} from "./Components/Footer/Footer";
import SinglePage from "./Components/Main/Shop/Product/SinglePage";
import Error from "./Error";
import ScrollToTop from "./ScrollToTop";
import ContactUs from "./Components/Main/Pages/Contact/ContactUs";
import PrivacyPolicy from "./Components/Main/Pages/Policies/PrivacyPolicy";
import Termsandconditions from "./Components/Main/Pages/Policies/Termsandconditions";
import Invoice from "./Components/Main/Shop/Account/Invoice";
import Orders from "./Components/Main/Shop/Account/UserState/Orders";
import { AccountSettings } from "./Components/Main/Shop/Account/UserState/Settings";
import DashbordHome from "./Components/Main/Shop/Account/UserState/DashbordHome";
import Address from "./Components/Main/Shop/Account/UserState/Address";

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="App">
      <CartProvider>
        <Menu />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Stepper />} />
            <Route path="shop" element={<Shop />} />
            <Route path="account" element={<Account />}>
            <Route path="/account" element={<DashbordHome />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/settings" element={<AccountSettings />} />
              <Route path="/account/addresses" element={<Address />} />
            </Route>
            <Route path="/account/orders/:id" element={<Invoice />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="shop/product/:itemId" element={<SinglePage />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="tc" element={<Termsandconditions />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </ScrollToTop>
        <Footer />
        <BottomNav />
      </CartProvider>
    </div>
  );
}

export default App;
