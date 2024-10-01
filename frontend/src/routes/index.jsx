import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LogIn from "../container/logIn";
import SignUp from "../container/signUp";
import Home from "../container/home";
import Details from "../container/details";
import Options from "../container/options";
import PersonaOverview from "../container/personaOverview";
import Insights from "../container/insights";
import SustainabiltyIT from "../container/sustainabiltyIT";
import EnterOTP from "../container/forgotPassword/enterOTP";
import { ForgotPassword } from "../container/forgotPassword/forgotPassword";
import NewPassword from "../container/forgotPassword/newPassword";
import HeaderComp from "../components/header";
import MyAccount from "../container/myAccount";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" replace />,
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "my-account",
    element: <MyAccount />,
  },
  {
    path: "enter-otp",
    element: <EnterOTP />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "new-password",
    element: <NewPassword />,
  },
  {
    path: "header",
    element: <HeaderComp />,
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Navigate to="details" replace />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "options",
        element: <Options />,
      },
      {
        path: "persona-overview",
        element: <PersonaOverview />,
      },
      {
        path: "insights",
        element: <Insights />,
      },
      {
        path: "sustainabilty-IT",
        element: <SustainabiltyIT />,
      },
    ],
  },
]);

export default router;
