import ContactUsScreen from "./Screen/ContactUsScreen";
import HomeScreen from "./Screen/HomeScreen";
import IntroductionScreen from "./Screen/IntroductionScreen";
import CategoryScreen from "./Screen/categoryScreen";
import LoginScreen from "./Screen/loginScreen";
import PostProductScreen from "./Screen/postProductScreen";
import ProductScreen from "./Screen/productScreen";
import NavComponent from './components/NavComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import EditProductScreen from "./Screen/editProductScreen";
import CartScreen from "./Screen/cartScreen";
import RegisterScreen from "./Screen/registerScreen";

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
        <NavComponent />
        <ToastContainer position='bottom-center' limit={1} />
      <main>
          <Routes>
            <Route path="/Simple-project-frontend" element={<HomeScreen />} />
            <Route path="/Simple-project-frontend/Introduction" element={<IntroductionScreen />} />
            <Route path="/Simple-project-frontend/ContactUs" element={<ContactUsScreen />} />
            <Route path="/Simple-project-frontend/categories/:categoryProduct" element={<CategoryScreen  />} />
            <Route path="/Simple-project-frontend/categories/:categoryProduct/:id" element={<ProductScreen />} />
            <Route path="/Simple-project-frontend/login" element={<LoginScreen />} />
            <Route path="/Simple-project-frontend/register" element={<RegisterScreen />} />
            <Route path="/Simple-project-frontend/product/admin" element={<PostProductScreen />} />
            <Route path="/Simple-project-frontend/product/admin/:id/edit" element={<EditProductScreen />} />
            <Route path="/Simple-project-frontend/cart" element={<CartScreen />} />
          </Routes>
        </main>
        <footer>
          <div className='text-center'>all rights reserved</div>
        </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
