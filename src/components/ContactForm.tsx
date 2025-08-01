import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { services } from '@/data';
import { publicKey, serviceId, templateId } from '@/constants';

export const ContactForm = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null,
  );

  const updateServiceFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');

    if (serviceParam) {
      const decoded = decodeURIComponent(serviceParam);
      const service = services.find((s) => s.id === Number(decoded));
      setSelectedService(decoded);

      if (service) {
        setFormMessage(
          `¡Hola! Me gustaría recibir más información sobre el servicio de ${service.name}.`,
        );
      }
    }
  };

  useEffect(() => {
    emailjs.init(publicKey);
    updateServiceFromURL();

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const patchHistoryMethod = (
      method: (data: any, unused: string, url?: string | URL | null) => void,
    ) => {
      return function (
        this: typeof history,
        ...args: [any, string, (string | URL | null)?]
      ) {
        const result = method.apply(this, args);
        window.dispatchEvent(new Event('urlChange'));
        return result;
      };
    };

    history.pushState = patchHistoryMethod(originalPushState);
    history.replaceState = patchHistoryMethod(originalReplaceState);

    window.addEventListener('popstate', updateServiceFromURL);
    window.addEventListener('urlChange', updateServiceFromURL);

    return () => {
      window.removeEventListener('popstate', updateServiceFromURL);
      window.removeEventListener('urlChange', updateServiceFromURL);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  const validateForm = (form: HTMLFormElement): boolean => {
    // Honeypot check
    const honeypot = form.querySelector<HTMLInputElement>(
      'input[name="company_name"]',
    );
    if (honeypot?.value) {
      console.warn('Formulario bloqueado por honeypot (posible bot)');
      return false;
    }

    // Rate limiting
    const lastSubmission = localStorage.getItem('last_form_submit');
    const now = Date.now();
    if (lastSubmission && now - Number(lastSubmission) < 60000) {
      setStatusType('error');
      setStatusMessage('Espera unos segundos antes de enviar otro mensaje.');
      return false;
    }

    localStorage.setItem('last_form_submit', now.toString());
    return true;
  };

  const sendForm = async (form: HTMLFormElement) => {
    try {
      await emailjs.sendForm(serviceId, templateId, form);
      setStatusType('success');
      setStatusMessage(
        'Mensaje enviado correctamente. Nos pondremos en contacto contigo en breve.',
      );
      form.reset();
      setSelectedService('');
      setFormMessage('');
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatusType('error');
      setStatusMessage(
        'Lo sentimos, ocurrió un error al enviar tu mensaje. Por favor, intenta nuevamente más tarde.',
      );
    }

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateForm(form)) return;

    await sendForm(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="user_name"
        >
          Nombre
        </label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          placeholder="Ingrese un nombre y apellido"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="user_email"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          name="user_email"
          id="user_email"
          placeholder="Ingrese un correo electrónico"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="service"
        >
          Servicio de interés
        </label>
        <select
          name="service"
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona un servicio</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="message"
        >
          Mensaje
        </label>
        <textarea
          value={formMessage}
          onChange={(e) => setFormMessage(e.target.value)}
          name="message"
          id="message"
          placeholder="Ingrese un mensaje"
          rows={5}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <input
        type="text"
        name="company_name"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Enviar mensaje
        </button>

        {statusMessage && (
          <p
            className={`mt-4 text-sm font-medium ${
              statusType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
};
