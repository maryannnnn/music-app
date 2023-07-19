import React, {FC, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {getMenuTopAction} from "../../entities/menu/actions/menuActions";
import {MenuTopAction} from "../../entities/menu/types/menuTypes";
import {useTypedDispatch} from "../../app/story/hooks/useTypedDispatch";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";

const MenuTop: FC = () => {
    const dispatch = useTypedDispatch();
    const menuId = 0;
    const { isLoadingMenu, errorMenu, menu } = useTypedSelector(state => state.menuTopReducer);

    useEffect(() => {
        dispatch(getMenuTopAction(menuId));
    }, [dispatch, menuId]);

    return (
        <ul className="flex flex-row gap-2 text-white t-14">
            {console.log("menu", menu)}
            {menu.map( link =>
                <li className='hover:text-gray-200' key={link.id}>
                    <Link href={link.urlLink} alt={link.nameLink}>
                        {link.nameLink}
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default MenuTop;