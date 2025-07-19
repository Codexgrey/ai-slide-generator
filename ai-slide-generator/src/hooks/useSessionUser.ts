import { useSession } from 'next-auth/react';

export default function useSessionUser() {
    const { data, status } = useSession();
    return {
        user: data?.user || null,
        loading: status === 'loading',
        authenticated: status === 'authenticated',
    };
}
