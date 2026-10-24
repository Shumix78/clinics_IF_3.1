import { Link } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';

export default function HomePage() {
    return (
        <>
            <PageHeading title="Поліклініки Івано-Франківська" />
            <p>Єдиний електронний довідник поліклінік та амбулаторій міста.</p>
            <p>Переглядайте інформацію про медзаклади та оформлюйте записи на прийом.</p>
            <p><Link to="/clinics">Перейти до каталогу закладів</Link></p>
            <p><Link to="/appointments">Переглянути записи на прийом</Link></p>
        </>
    );
}