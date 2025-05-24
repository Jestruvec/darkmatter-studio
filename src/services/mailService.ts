import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

let instance: {
  sendEmail: (form: HTMLFormElement) => Promise<EmailJSResponseStatus>;
};

export const mailService = () => {
  if (instance) return instance;

  const sendEmail = async (
    form: HTMLFormElement
  ): Promise<EmailJSResponseStatus> => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const response = await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        publicKey
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred.");
    }
  };

  instance = {
    sendEmail,
  };

  return instance;
};
