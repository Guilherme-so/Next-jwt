import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "./authService";

//Decorator pattern to authorization with "getServerSideProps"
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



//Decorator pattern to authorization on client Side "my favorite"

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then((res) => {
        setSession(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    session,
    loading,
    error,
  };
}


export function withSessionHoc(Component){
  return function Wrapper(props) {
    const router = useRouter();
    const { session, loading, error } = useSession();
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!loading && error) {
      router.push("/?error=anauthorized");
    }

    const modifiedProps = {
      ...props,
      session
    }

    return <Component {...modifiedProps} />
  }
}
