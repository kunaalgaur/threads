export let currentUserId: string;

if (typeof window !== 'undefined') {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
        currentUserId = storedUserId;
    }
}
