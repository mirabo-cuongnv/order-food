import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import SignIn from './pages/SignIn';
import AdminRoot from './pages/Admin';
import Admin from './pages/Admin/Admin';
import AdminCreateDish from './pages/Admin/AdminCreateDish';
import AdminQA from './pages/Admin/AdminQA';
import AdminDepositConfirm from './pages/Admin/AdminDepositConfirm';
import AdminHistoryDeposit from './pages/Admin/AdminHistoryDeposit';
import AdminOrder from './pages/Admin/AdminOrder';
import AdminManagerCustomer from './pages/Admin/AdminManagerCustomer';
import CustomerRoot from './pages/Customer';
import Customer from './pages/Customer/Customer';
import CustomerDeposit from './pages/Customer/CustomerDeposit';
import CustomerWallet from './pages/Customer/CustomerWallet';
import CustomerOrder from './pages/Customer/CustomerOrder';
import OrderCreate from './pages/Customer/components/order/OrderCreate';
import OrderEdit from './pages/Customer/components/order/OrderEdit';
import OrderInfo from './pages/Customer/components/order/OrderInfo';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/admin" element={<AdminRoot />}>
            <Route path="" element={<Admin />} />
            <Route path="add" element={<AdminCreateDish />} />
            <Route path="qa-code" element={<AdminQA />} />
            <Route path="diposit-confirm" element={<AdminDepositConfirm />} />
            <Route path="history" element={<AdminHistoryDeposit />} />
            <Route path="ordered" element={<AdminOrder />} />
            <Route path="customer" element={<AdminManagerCustomer />} />
          </Route>
          <Route path="/customer" element={<CustomerRoot />}>
            <Route path="" element={<Customer />} />
            <Route path="order" element={<CustomerOrder />}>
              <Route path="" element={<OrderInfo />} />
              <Route path="create" element={<OrderCreate />} />
              <Route path="edit" element={<OrderEdit />} />
            </Route>
            <Route path="wallet" element={<CustomerWallet />} />
            <Route path="deposit" element={<CustomerDeposit />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
