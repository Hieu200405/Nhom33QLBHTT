import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import OrdersAvailable from './pages/OrdersAvailable';
import OrdersAssigned from './pages/OrdersAssigned';
import OrdersDelivered from './pages/OrdersDelivered';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('shipper_token');
    const userData = localStorage.getItem('shipper_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('shipper_token');
        localStorage.removeItem('shipper_user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Đăng xuất: xóa token và user, chuyển về /login
  const handleLogout = () => {
    localStorage.removeItem('shipper_token');
    localStorage.removeItem('shipper_user');
    setUser(null);
    window.location.href = '/login';
  };

  // Đăng nhập thành công: lưu user vào state
  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          {user && <NavBar user={user} onLogout={handleLogout} />}
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Routes>
              <Route 
                path="/login" 
                element={
                  user ? <Navigate to="/orders/available" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
                } 
              />
              <Route 
                path="/orders/available" 
                element={
                  user ? <OrdersAvailable /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/orders/assigned" 
                element={
                  user ? <OrdersAssigned /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/orders/delivered" 
                element={
                  user ? <OrdersDelivered /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="*" 
                element={
                  user ? <Navigate to="/orders/available" replace /> : <Navigate to="/login" replace />
                } 
              />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
