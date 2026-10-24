import { useEffect } from 'react';

export default function PageHeading({ title }) {
    useEffect(() => {
        const prev = document.title;
        document.title = `${title} | Поліклініки Франківська`;
        return () => {
            document.title = prev;
        };
    }, [title]);

    return <h1>{title}</h1>;
}