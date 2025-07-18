import RegisterForm from "../Components/RegisterForm";
import NavBar from "../../../Components/NavBar";

function RegisterPage() {
  return (
    <div className="flex flex-col gap-20">
      <NavBar/>
      <RegisterForm/>
    </div>
  );
}

export default RegisterPage;
