import { tokenService } from "./tokenService";

export const authService = {
  async login({ username, password }) {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(async (respostaDoServidor) => {
      if (!respostaDoServidor.ok)
        throw new Error("Usuário ou senha inválidos!");
      const body = await respostaDoServidor.json();
      tokenService.save(body.data.access_token);
    });
  },
  async getSession(ctx = null) {
    const token = tokenService.get(ctx);
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Não autorizado!");
        return resposta.json();
      })
      .then(async (resData) => {
        return resData.data;
      });
  },
};
