'use client';

export default function Dashboard() {
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'  
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
