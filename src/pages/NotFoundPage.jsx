import { Link } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';

export default function NotFoundPage({
                                         title = '404: сторінку не знайдено',
                                         message = 'Перевірте адресу або скористайтеся навігацією.',
                                     }) {
    return (
        <>
            <PageHeading title={title} />
            <p>{message}</p>
            <p><Link to="/clinics">Перейти до каталогу поліклінік</Link></p>
            <p><Link to="/">На головну</Link></p>
        </>
    );
}