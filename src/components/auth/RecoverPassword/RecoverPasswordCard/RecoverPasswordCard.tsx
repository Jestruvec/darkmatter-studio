import { CustomBtn, LangSwitch, RecoverPasswordForm } from "@/components";
import { useAuthUIContext } from "@/context";
import { useTranslation } from "react-i18next";

export const RecoverPasswordCard = () => {
  const { goToLogin } = useAuthUIContext();
  const { t } = useTranslation();

  return (
    <article className="w-full h-full rounded-lg dark:border border-gray-500 shadow-lg flex flex-col justify-evenly">
      <header className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-500">
        <h1 className="text-2xl">{t("recoverPasswordCard.title")}</h1>
        <LangSwitch />
      </header>

      <main className="pt-6 px-6 flex flex-col justify-center gap-6 h-full">
        <p className="text-sm">{t("recoverPasswordCard.description")}</p>
        <RecoverPasswordForm />
      </main>

      <footer className="p-4 text-center text-sm">
        <CustomBtn
          variant="text"
          size="sm"
          text={t("recoverPasswordCard.back")}
          onClick={goToLogin}
        />
      </footer>
    </article>
  );
};
