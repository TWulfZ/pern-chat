import { useAuthContext } from "context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignupInputs {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup =  async (inputs: SignupInputs) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json();

      if(!res.ok) throw new Error(data.error)

      setAuthUser(data)

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup }
}

export default useSignup