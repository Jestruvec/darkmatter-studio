import { CustomBtn, CustomInput, CustomMessage } from "@/components";
import { useAuthContext } from "@/context";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
}

export const RecoverPasswordForm = () => {
  const { recoverPassword, recoverResponse, error, loading } = useAuthContext();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ defaultValues: { email: "" } });

  useEffect(() => {
    if (recoverResponse) {
      reset();
    }
  }, [recoverResponse]);

  const onSubmit = async (data: FormValues) => {
    const { email } = data;
    recoverPassword(email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {error && <CustomMessage message={error} type="error" size="sm" />}
      {recoverResponse && (
        <CustomMessage message={t("recoverPasswordForm.success")} size="sm" />
      )}

      <CustomInput
        id="email"
        type="email"
        placeholder={t("recoverPasswordForm.email")}
        label={t("recoverPasswordForm.email")}
        validation={{ required: t("loginForm.errors.email") }}
        register={register}
        error={errors.email?.message}
      />

      <CustomBtn text={t("recoverPasswordForm.recover")} loading={loading} />
    </form>
  );
};
