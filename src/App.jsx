import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/Order_confirmation';
import ProductListing from './pages/Product_listing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductListing />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App;
