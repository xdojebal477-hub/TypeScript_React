//Reto Práctico: Lista de Usuarios (Fetch)
//Debes crear un componente que consuma una API real (jsonplaceholder).
// Debes gestionar los estados de carga y datos.

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  website: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <p className="text-center">Cargando usuarios...</p>;

  return (
    <div>
      <h2 className="text-center">Directorio de Usuarios</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <h3>{user.name}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{user.email}</p>
            <a
              href={`http://${user.website}`}
              target="_blank"
              style={{ color: "#3498db" }}
            >
              Visitar Web
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
