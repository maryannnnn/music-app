import React, {FC} from 'react';
import {selectIcons} from "../../shared/select-options/select-options"

interface PropsIconDisplay {
    iconName: string;
}

const IconDisplay: FC<PropsIconDisplay> = ({iconName}) => {

    return (
        <>
            {selectIcons.length > 0 && selectIcons
                .filter(item => item.value === iconName)
                .map(item =>
                <div>{item.component}</div>
            )
            }
        </>
    )
}

export default IconDisplay