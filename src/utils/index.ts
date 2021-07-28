export const reloadApp = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '';
    }
};
