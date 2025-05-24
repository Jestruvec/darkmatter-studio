import { useForm } from "react-hook-form";
import { CustomBtn, CustomInput, CustomMessage } from "@/components";
import { useAuthContext, useAuthUIContext } from "@/context";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const { goToRecover } = useAuthUIContext();
  const { login, loading, error: authError } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formValidations = {
    email: {
      required: t("loginForm.errors.email"),
    },
    password: {
      required: t("loginForm.errors.password"),
    },
  };

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {authError && (
        <CustomMessage message={authError} type="error" size="sm" />
      )}

      <CustomInput
        id="email"
        type="email"
        variant="underlined"
        register={register}
        validation={formValidations.email}
        label={t("loginForm.email")}
        placeholder={t("loginForm.email")}
        error={errors.email?.message}
      />

      <div>
        <CustomInput
          id="password"
          type="password"
          variant="underlined"
          register={register}
          validation={formValidations.password}
          label={t("loginForm.password")}
          placeholder={t("loginForm.password")}
          error={errors.password?.message}
        />

        <div className="flex justify-end">
          <CustomBtn
            onClick={goToRecover}
            text={t("loginForm.recoverPass")}
            variant="text"
            size="sm"
          />
        </div>
      </div>

      <CustomBtn
        text={t("loginForm.login")}
        loading={loading}
        disabled={loading}
        className="mt-4"
      />
    </form>
  );
};
