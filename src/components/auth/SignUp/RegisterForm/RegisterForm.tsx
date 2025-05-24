import { useForm } from "react-hook-form";
import { CustomBtn, CustomInput, CustomMessage } from "@/components";
import { useAuthContext } from "@/context";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
  passConfirm: string;
};

export const RegisterForm = () => {
  const { t } = useTranslation();
  const { signUp, loading, error, signUpResponse } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passConfirm: "",
    },
  });
  const passwordValue = watch("password");
  const formValidations = {
    email: {
      required: t("registerForm.errors.email"),
    },
    password: {
      required: t("registerForm.errors.password"),
    },
    passConfirm: {
      required: t("registerForm.errors.passConfirm"),
      validate: (value: string) =>
        value === passwordValue || t("registerForm.errors.passwordMismatch"),
    },
  };

  useEffect(() => {
    if (signUpResponse) {
      reset();
    }
  }, [signUpResponse]);

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;

    signUp(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {error && <CustomMessage message={error} type="error" size="sm" />}
      {signUpResponse && (
        <CustomMessage message={t("registerForm.success")} size="sm" />
      )}

      <CustomInput
        id="email"
        type="email"
        label={t("registerForm.email")}
        variant="underlined"
        placeholder={t("registerForm.email")}
        register={register}
        validation={formValidations.email}
        error={errors.email?.message}
      />

      <CustomInput
        id="password"
        type="password"
        label={t("registerForm.password")}
        variant="underlined"
        placeholder={t("registerForm.password")}
        register={register}
        validation={formValidations.password}
        error={errors.password?.message}
      />

      <CustomInput
        id="passConfirm"
        type="password"
        label={t("registerForm.passConfirm")}
        variant="underlined"
        placeholder={t("registerForm.passConfirm")}
        register={register}
        validation={formValidations.passConfirm}
        error={errors.passConfirm?.message}
      />

      <CustomBtn
        text={t("registerForm.register")}
        loading={loading}
        disabled={loading}
        className="mt-2"
      />
    </form>
  );
};
