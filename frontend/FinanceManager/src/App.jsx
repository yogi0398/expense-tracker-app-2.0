import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SIgnUp from './pages/Auth/SIgnUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const [theme, setTheme] = useState("light");

  const handleModeToggle = (e) => {
    console.log("Before toggle → theme =", theme);

    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
    console.log("After Toggling → theme =", theme);
  };


  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
    else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
      if (prefersDarkScheme.matches) {
        // User prefers dark mode
        // console.log("Browser theme: Dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      } else {
        // User prefers light mode (or no preference, which defaults to light)
        console.log("Browser theme: Light");
        localStorage.setItem("theme", "light");
        setTheme("light");
      }
    }
  }, [])

  // const Mode = () => {
  //   if (localStorage.getItem("theme")) {
  //     setTheme(localStorage.getItem("theme"));
  //   }
  //   else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     // Dark mode is enabled
  //     console.log("Dark mode is active in the browser.");
  //     setTheme("dark");

  //   }
  //   else {
  //     // Dark mode is not enabled or light mode is preferred
  //     console.log("Dark mode is not active in the browser.");
  //     setTheme("light");
  //   }
  // }
  // Mode();
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/signup" element={<SIgnUp theme={theme} />} />
            <Route path="/dashboard" element={<Home theme={theme} onToggle={(e) => handleModeToggle(e)} />} />
            <Route path="/income" element={<Income theme={theme} onToggle={(e) => handleModeToggle(e)} />} />
            <Route path="/expense" element={<Expense theme={theme} onToggle={(e) => handleModeToggle(e)} />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App;

const Root = ({ theme }) => {
  //Check if token exists in local Storage
  const isAuthenticated = !!localStorage.getItem("token");



  //Redirect to dashboard if authenticated else redirect to login
  return (
    isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
  )
}


