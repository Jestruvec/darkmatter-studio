import { CustomBtn, CustomInput, CustomMessage } from "@/components";
import { useEmail } from "@/hooks";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
  user_name: string;
  user_email: string;
  message: string;
}

export const ContactForm = () => {
  const { emailResponse, loading, error, sendEmailRequest } = useEmail();
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { user_name: "", user_email: "", message: "" },
  });

  const onSubmit = (_data: FormValues) => {
    if (!formRef.current) return;
    sendEmailRequest(formRef.current);
  };

  const validation = {
    user_name: {
      required: t("contactForm.errors.user_name"),
    },
    user_email: {
      required: t("contactForm.errors.user_email"),
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t("contactForm.errors.invalid_email"),
      },
    },
    message: {
      required: t("contactForm.errors.message"),
    },
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full h-full"
    >
      {error && <CustomMessage message={error} type="error" size="sm" />}
      {emailResponse && (
        <CustomMessage message={t("contactForm.success")} size="sm" />
      )}

      <CustomInput
        id="user_name"
        label={t("contactForm.user_name")}
        placeholder={t("contactForm.user_name")}
        register={register}
        validation={validation.user_name}
        error={errors.user_name?.message}
      />
      <CustomInput
        id="user_email"
        label={t("contactForm.user_email")}
        placeholder={t("contactForm.user_email")}
        register={register}
        validation={validation.user_email}
        error={errors.user_email?.message}
      />
      <CustomInput
        id="message"
        label={t("contactForm.message")}
        placeholder={t("contactForm.message")}
        register={register}
        validation={validation.message}
        error={errors.message?.message}
      />

      <CustomBtn
        className="mt-4"
        text={t("contactForm.submit")}
        loading={loading}
      />
    </form>
  );
};
