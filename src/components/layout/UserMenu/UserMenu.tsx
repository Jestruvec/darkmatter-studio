import { CustomBtn, CustomMenu, LangSwitch, ThemeSwitch } from "@/components";
import { useAuthContext } from "@/context";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";

export const UserMenu = () => {
  const { t } = useTranslation();
  const { authResponse, logout } = useAuthContext();

  return (
    <CustomMenu activatorChildren={<FaUser />} className="w-56 p-4">
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold mb-1">{t("common.language")}</p>
          <LangSwitch />
        </div>

        <div>
          <p className="text-xs font-semibold mb-1">{t("common.theme")}</p>
          <ThemeSwitch />
        </div>

        <hr className="my-2 border-gray-500" />

        {authResponse ? (
          <CustomBtn
            size="sm"
            variant="text"
            text={t("common.logout")}
            onClick={logout}
            className="text-red-700"
          />
        ) : (
          <CustomBtn
            size="sm"
            variant="text"
            text={t("common.login")}
            as="link"
            to="/login"
            className="text-green-700"
          />
        )}
      </div>
    </CustomMenu>
  );
};
