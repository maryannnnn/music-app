import React, {FC} from 'react';
import MenuMain from "../../shared/menu-main/MenuMain";


const HeaderBottom: FC = () => {

    return (
        <div className='w-screen bg-khaki-200'>
            <div className='container flex flex-row justify-between gap-2 items-center h-9'>
                <div className='basis-3/4 content-start'>
                    <MenuMain/>
                </div>
                <div className='basis-1/4 content-end flex flex-row'>

                </div>
            </div>
        </div>
    );
}

export default HeaderBottom
