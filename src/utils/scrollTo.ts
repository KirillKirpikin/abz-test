export const scrollTo = async (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
};
