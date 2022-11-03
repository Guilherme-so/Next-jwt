import React, { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('omariosouto');
  const [senha, setSenha] = useState('safepassword');

  function handleSubmit(event) {
    event.preventDefault();
    authService.login({
        username: usuario,
        password: senha,
      })
      .then(() => {
        router.push("/auth-page-static");
        // router.push('/auth-page-ssr');
      })
      .catch((err) => {
        console.log(err);
        alert("Usuário ou a senha estão inválidos");
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          name="usuario"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
