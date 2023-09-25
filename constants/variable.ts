export let currentUserId: string;
export let token: string;

if (typeof window !== 'undefined') {
    currentUserId = localStorage.getItem('userId') as string;
    token = localStorage.getItem('token') as string;
}
