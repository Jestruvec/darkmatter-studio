import { ContactForm, SocialMediaBtns } from "@/components";
import { useTranslation } from "react-i18next";

export const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <section className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto py-10 px-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t("contactPage.title")}
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-6">
          {t("contactPage.description")}
        </p>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {t("contactPage.contactForm")}
        </h2>

        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <ContactForm />
          </div>
        </div>

        <footer className="p-4 text-center text-sm">
          <p>{t("emailCard.socialMedia")}</p>

          <div className="mt-4">
            <SocialMediaBtns />
          </div>
        </footer>
      </div>
    </section>
  );
};
