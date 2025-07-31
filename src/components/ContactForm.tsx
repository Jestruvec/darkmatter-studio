import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export const ContactForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null,
  );

  useEffect(() => {
    emailjs.init('RVkKVoK-R0AA4ELst');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await emailjs.sendForm('service_3dkj5yk', 'template_9xgv3s2', form);
      setStatusType('success');
      setStatusMessage('Mensaje enviado correctamente.');
      form.reset();
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatusType('error');
      setStatusMessage('Ocurrió un error. Intenta más tarde.');
    }

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 5000);
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="">Selecciona un servicio</option>
          <option value="Desarrollo a la Medida">Desarrollo a la Medida</option>
          <option value="Landing Page Profesional">
            Landing Page Profesional
          </option>
          <option value="Mantenimiento Web">Mantenimiento Web</option>
          <option value="Tienda en Línea">Tienda en Línea</option>
          <option value="Plataforma Administrativa">
            Plataforma Administrativa
          </option>
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
          name="message"
          id="message"
          placeholder="Ingrese un mensaje"
          rows={5}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 cursor-pointer bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-700 transition"
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
