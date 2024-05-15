import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from './Components/Login'
import ChatPage from './Components/Chat';
import AboutPage from './Components/About';
import ContactPage from './Components/Contact';
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./Components/Home";
import SignupPage from "./Components/Signup";
import ForgotpswdPage from "./Components/Forgotpswd";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout/>}>
            <Route path="" element={<HomePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot" element={<ForgotpswdPage />} />            
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
