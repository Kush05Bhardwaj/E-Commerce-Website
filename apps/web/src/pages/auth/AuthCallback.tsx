import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      navigate("/auth/login?error=oauth_failed");
      return;
    }

    if (token) {
      // TODO: Fetch user data with the token
      // For now, we'll just store the token and redirect
      localStorage.setItem("accessToken", token);
      
      // You should fetch the user data here
      // For now, redirecting to home
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
        <p className="mt-4 text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
