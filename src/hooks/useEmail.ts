import { apiErrorHandler } from "@/utils";
import { mailService } from "@/services";
import { EmailJSResponseStatus } from "@emailjs/browser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useEmail = () => {
  const { t } = useTranslation();
  const { sendEmail } = mailService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailResponse, setEmailResponse] =
    useState<EmailJSResponseStatus | null>(null);

  const sendEmailRequest = async (form: HTMLFormElement) => {
    setLoading(false);
    setError(null);

    try {
      const response = await sendEmail(form);
      setEmailResponse(response);

      //para ocultar mensaje
      setTimeout(() => {
        setEmailResponse(null);
      }, 3000);
    } catch (error) {
      apiErrorHandler(
        error,
        setError,
        t("mailService.errors.sendEmailRequest")
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendEmailRequest, loading, error, emailResponse };
};
