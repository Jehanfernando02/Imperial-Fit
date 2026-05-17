import { SignUp } from "@clerk/clerk-react";
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-neutral-950 px-4 overflow-hidden">
      {/* Background */}
      <img src="/assets/Hero/bg4.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-[0.05] blur-sm" />

      <div className="relative z-10 flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Dumbbell className="text-yellow-400 w-8 h-8" />
          <span className="text-2xl font-bold text-white">Imperial <span className="gradient-text">Fit</span></span>
        </Link>
        <SignUp />
      </div>
    </main>
  );
}

export default SignUpPage;
