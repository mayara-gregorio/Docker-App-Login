'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Tentativa de cadastro com:', { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-50 to-indigo-200 px-4">
      
      {/* Card com efeito Glassmorphism */}
      <div className="max-w-sm w-full bg-white/40 backdrop-blur-lg border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        
        <h2 className="text-xl font-extrabold text-center text-[#111827] mb-8 tracking-wide">
          Crie sua conta
        </h2>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo de Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition-all"
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@gmail.com"
              className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition-all"
            />
          </div>

          {/* Campo de Senha com o Ícone de Olho */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-white/90 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition-all"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botão de Cadastrar */}
          <button
            type="submit"
            className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-blue-500 to-[#1e1b4b] text-white text-base font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
          
        </form>

        {/* Link para voltar ao Login */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Já tem uma conta?{' '}
          <Link 
            href="/login" 
            className="font-bold text-[#1e1b4b] hover:text-blue-700 hover:underline transition-colors"
          >
            Faça login aqui
          </Link>
        </p>

      </div>
    </div>
  );
}