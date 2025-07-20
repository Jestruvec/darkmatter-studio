import { WebDevelopmentSVG } from "@/assets/svg";
import {
  RegisterCard,
  LoginCard,
  RecoverPasswordCard,
  AuthUIProvider,
} from "@/components";
import { useAuthUIContext } from "@/context";

export const LoginPage = () => {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 dark:bg-gray-800 dark:text-white">
      <div className="hidden lg:flex items-center justify-center">
        <div className="max-w-xl flex">
          <WebDevelopmentSVG />
        </div>
      </div>

      <div className="flex items-center justify-center px-6">
        <div className="max-w-xl h-1/2 flex w-full">
          <AuthUIProvider>
            <AuthUIContent />
          </AuthUIProvider>
        </div>
      </div>
    </div>
  );
};

const AuthUIContent = () => {
  const { authUIState } = useAuthUIContext();

  if (authUIState === "register") return <RegisterCard />;
  if (authUIState === "recover") return <RecoverPasswordCard />;
  return <LoginCard />;
};
