import { CustomBtn, CustomMenu, LangSwitch, ThemeSwitch } from "@/components";
import { useAuthContext } from "@/context";
import { useTranslation } from "react-i18next";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

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
          <CustomBtn size="sm" variant="text" onClick={logout}>
            <div className="flex items-center gap-2">
              <FaSignOutAlt color="red" />
              <span>{t("common.logout")}</span>
            </div>
          </CustomBtn>
        ) : (
          <CustomBtn size="sm" variant="text" as="link" to="/login">
            <div className="flex items-center gap-2">
              <FaSignInAlt color="green" />
              <span>{t("common.login")}</span>
            </div>
          </CustomBtn>
        )}
      </div>
    </CustomMenu>
  );
};
