import { authService } from "./authService";

//Decorator pattern
export function withSession(funcao) {
    return async (ctx) => {
      try {
        const session = await authService.getSession(ctx);
        const modifiedContext = {
          ...ctx,
          req: {
            ...ctx.req,
            session,
          },
        };
        return funcao(modifiedContext);
      } catch (err) {
        return {
          redirect: {
            permanent: false,
            destination: "/?error=unauthorized",
          },
        };
      }
    };
  }