import axiosInstance from '@/lib/axiosInstance';
import { Action } from '@/lib/main.schema';
import { useRouter } from 'next/navigation';

function useActionResolver() {
  const router = useRouter();
  return async function resolver(action: Action) {
    if (action.type === 'api_call') {
      try {
        const res = await axiosInstance.request({
          url: action.endpoint,
          method: action.method,
        });

        return res;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Something went wrong while requesting ${action.endpoint}`;
        return {
          status: 500,
          message: errorMessage,
        };
      }
    } else if (action.type === 'navigate') {
      router.push(action.target);
    }
  };
}

export default useActionResolver;
