import { CustomBtn, LangSwitch, RegisterForm } from "@/components";
import { useAuthUIContext } from "@/context";
import { useTranslation } from "react-i18next";

export const RegisterCard = () => {
  const { goToLogin } = useAuthUIContext();
  const { t } = useTranslation();

  return (
    <article className="w-full h-full dark:border rounded-lg border-gray-500 shadow-lg flex flex-col justify-evenly">
      <header className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-500">
        <h1 className="text-2xl">{t("registerCard.title")}</h1>
        <LangSwitch />
      </header>

      <section className="pt-6 px-6 h-full">
        <RegisterForm />
      </section>

      <footer className="p-4 text-center text-sm">
        <p>
          {t("registerCard.haveAccount")}
          <CustomBtn
            variant="text"
            size="sm"
            text={t("registerCard.login")}
            onClick={goToLogin}
          />
        </p>
      </footer>
    </article>
  );
};
