import { useTranslation } from "react-i18next";
import { CustomBtn } from "@/components";

export const LangSwitch = () => {
  const { i18n, t } = useTranslation();

  return (
    <div>
      <CustomBtn
        variant="text"
        size="sm"
        text={t("langBtn.spanish")}
        onClick={() => i18n.changeLanguage("es")}
      />
      /
      <CustomBtn
        variant="text"
        size="sm"
        text={t("langBtn.english")}
        onClick={() => i18n.changeLanguage("en")}
      />
    </div>
  );
};
