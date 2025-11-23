"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6"; // Usaremos un ícono de un paquete más moderno
import { personalInfo as sitePersonalInfo } from '@/lib/data';

// Datos de ejemplo
const personalInfo = {
  email: sitePersonalInfo.email,
  github: sitePersonalInfo.github,
  linkedin: 'https://www.linkedin.com/in/tu-usuario/',
  name: 'GIANELLA CORDOVA',
  location: 'Arequipa, Perú', // Nuevo campo para dar contexto
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }
    
    if (!isValidEmail(form.email)) {
      setError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    setLoading(true); 

    try {
      // ⚠️ AQUÍ CONECTARÍAS TU API O SERVICIO DE MAILING
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Hubo un error al enviar el mensaje. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false); 
      setTimeout(() => setSubmitted(false), 5000); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
      
      {/* Encabezado Estilizado */}
      <header className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
          ¡Conectemos! <FaRegHandshake className="inline text-blue-600 align-middle ml-2" />
        </h1>
        <p className="text-xl text-gray-600">
          ¿Listo para iniciar una colaboración? Contáctame para proyectos, consultas o para decir hola.
        </p>
      </header>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* === Información de Contacto (Panel de Datos) === */}
        <div className="lg:w-1/3 flex flex-col justify-between gap-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 h-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-blue-50">Contacto Directo</h2>
            <div className="flex flex-col gap-6">
              
              {/* Ubicación */}
              <div className="flex items-start gap-4 text-gray-700">
                <FaMapMarkerAlt size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Ubicación Actual</h3>
                  <p>{personalInfo.location}</p>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-start gap-4 text-gray-700 group hover:text-blue-600 transition duration-200"
                aria-label="Enviar correo electrónico"
              >
                <FaEnvelope size={22} className="text-blue-600 group-hover:text-blue-700 mt-1 flex-shrink-0" /> 
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">Correo Electrónico</h3>
                  <p className="truncate">{personalInfo.email}</p>
                </div>
              </a>
              
            </div>
          </div>
          
          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 pt-6 border-t border-gray-100">Sígueme</h3>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white transition duration-200"
                aria-label="Ver perfil de GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white transition duration-200"
                aria-label="Ver perfil de LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>


        {/* === Formulario de Contacto (Módulo Principal) === */}
        <div className="lg:w-2/3 bg-gray-50 shadow-2xl rounded-2xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Formulario de Contacto</h2>
          
          {submitted && (
            <p className="bg-green-100 text-green-700 p-4 rounded-xl text-center font-medium mb-6 border border-green-200 shadow-sm">
              ✅ ¡Mensaje enviado! Gracias por contactarme, **{personalInfo.name}** responderá pronto.
            </p>
          )}
          {error && (
            <p className="bg-red-100 text-red-700 p-4 rounded-xl text-center font-medium mb-6 border border-red-200 shadow-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Campo Nombre */}
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ej. Juan Pérez"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200 text-base shadow-sm"
                required
              />
            </div>
            
            {/* Campo Correo */}
            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej. correo@dominio.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200 text-base shadow-sm"
                required
              />
            </div>
            
            {/* Campo Mensaje */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Describe tu proyecto o consulta aquí..."
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200 text-base shadow-sm"
                required
              />
            </div>
            
            {/* Botón de Envío */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full text-white font-semibold py-4 rounded-xl transition duration-300 flex items-center justify-center gap-3 text-lg
                  ${loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'
                  }
                `}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" size={20} /> Enviando...
                  </>
                ) : (
                  "Enviar Mensaje y Conectar"
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}