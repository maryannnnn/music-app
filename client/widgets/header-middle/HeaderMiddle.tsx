import React, {FC} from 'react';

const HeaderMiddle: FC = () => {
    return (
        <div className='w-screen bg-dark-100'>
            <div className='container flex flex-row justify-between items-center h-20'>
                <div className='text-white'>Middle</div>
            </div>
        </div>
    );
};

export default HeaderMiddle;