import { useAuthContext } from 'context/AuthContext';
import { useState } from 'react';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setAuthUser(null);
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
