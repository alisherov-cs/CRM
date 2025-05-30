import { LoginForm } from "./components/form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center md:justify-start">
      {/* Image Section */}
      <div className="hidden w-full md:w-1/2 bg-blue-50 md:flex items-center justify-center p-6">
        <div className="relative w-full max-w-md h-64 md:h-96">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_hybrid&w=740"
            alt="Login illustration"
            className="object-contain"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
