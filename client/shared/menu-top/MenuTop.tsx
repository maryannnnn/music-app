import React, {FC} from 'react';
import Link from 'next/link';

const MenuTop: FC = () => {
    return (
        <ul className="flex flex-row gap-2 text-white t-14">
            <li className='hover:text-gray-200'>
                <Link href='/' alt=''>
                    Главная
                </Link>
            </li>
            <li className='hover:text-gray-200'>
                <Link href='/' alt=''>
                    Модели
                </Link>
            </li>
            <li className='hover:text-gray-200'>
                <Link href='/' alt=''>
                    Доставка
                </Link>
            </li>
            <li className='hover:text-gray-200'>
                <Link href='/' alt=''>
                    Контакты
                </Link>
            </li>

        </ul>
    );
};

export default MenuTop;