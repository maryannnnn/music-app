import React, {FC} from 'react';
import HeaderTop from "../header-top/HeaderTop";
import HeaderMiddle from "../header-middle/HeaderMiddle";
import HeaderBottom from "../header-bottom/HeaderBottom";

const Header: FC = () => {
    return (
        <div className='w-screen flex flex-col justify-between'>
            <HeaderTop/>
            <HeaderMiddle/>
            <HeaderBottom/>
        </div>
    );
};

export default Header;
