import React from "react";
import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import NavBar from "../../../Components/NavBar";

export default function LoginPage() {
  return (
    <div className="">
      <NavBar />  
      <LoginForm />
    </div>
  );
}
