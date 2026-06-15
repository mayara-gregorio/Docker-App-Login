'use client';

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  function logout() {
    const response = fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao dashboard! Você está autenticado.</p>
      <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Sair
      </button>
    </div>
  );
}