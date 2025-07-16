import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Reviews } from './pages/Reviews';
import { Books } from './pages/Books';
import { BookDetails } from './pages/BookDetails';
import { Profile } from './pages/Profile';
import { Payment } from './pages/Payment';

import { AdminRoute } from './routes/AdminRoute';
import { AdminPanel } from './pages/admin/AdminPanel';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminBooks } from './pages/admin/AdminBooks';
import { AdminRentedBooks } from './pages/admin/AdminRentedBooks';
import { AdminBookReviews } from './pages/admin/AdminBookReviews';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/payment/:bookId' element={<Payment />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/profile' element={<Profile />} />
        

        {/* Admin Protected Routes */}
        <Route
          path="/auth/admin/*"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="rented-books" element={<AdminRentedBooks />} />
          <Route path='reviews' element={<AdminBookReviews />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
