import { CustomBtn, LangSwitch, LoginForm } from "@/components";
import { useAuthUIContext } from "@/context";
import { useTranslation } from "react-i18next";

export const LoginCard = () => {
  const { goToRegister } = useAuthUIContext();
  const { t } = useTranslation();

  return (
    <article className="w-full h-full dark:border rounded-lg border-gray-500 shadow-lg flex flex-col justify-evenly">
      <header className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-500">
        <h1 className="text-2xl">{t("loginCard.title")}</h1>
        <LangSwitch />
      </header>

      <section className="pt-6 px-6 h-full">
        <LoginForm />
      </section>

      <footer className="px-4 pb-4 text-center text-sm">
        <p>
          {t("loginCard.noAccount")}
          <CustomBtn
            variant="text"
            size="sm"
            text={t("loginCard.registerNow")}
            onClick={goToRegister}
          />
        </p>
      </footer>
    </article>
  );
};
