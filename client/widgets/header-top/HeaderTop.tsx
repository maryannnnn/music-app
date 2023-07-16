import React, {FC} from 'react';
import MenuTop from "../../shared/menu-top/MenuTop";
import MenuSoc from "../../shared/menu-soc/MenuSoc";

const HeaderTop: FC = () => {
    return (
        <div className='w-screen bg-dark-100'>
            <div className='container flex flex-row justify-between gap-2 items-center h-10'>
                <div className='basis-3/4 content-start'>
                    <MenuTop/>
                </div>
                <div className='basis-1/4 content-end'>
                    <MenuSoc/>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;