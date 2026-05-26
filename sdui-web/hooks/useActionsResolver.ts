import axiosInstance from '@/lib/axiosInstance';
import { Action } from '@/lib/main.schema';
import { useRouter } from 'next/navigation';

function useActionResolver() {
  const router = useRouter();
  return function resolver(action: Action) {
    if (action.type === 'api_call') {
      axiosInstance.request({
        url: action.endpoint,
        method: action.method,
      });
    } else if (action.type === 'navigate') {
      router.push(action.target);
    }
  };
}

export default useActionResolver;
