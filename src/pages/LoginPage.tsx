import {
  TesseractScene,
  RegisterCard,
  LoginCard,
  RecoverPasswordCard,
  AuthUIProvider,
} from "@/components";
import { useAuthUIContext } from "@/context";

export const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-[40dvh] md:h-full flex items-center justify-center">
        <TesseractScene />
      </div>

      <div className="flex justify-center items-center p-6 h-[60dvh] md:h-full dark:bg-gray-800 dark:text-white">
        <div className="w-full my-auto max-w-md h-[500px]">
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
