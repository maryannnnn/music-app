import React, {FC} from 'react';
import {selectIcons} from "../../shared/select-options/select-options"

interface PropsIconDisplay {
    iconLabel: number;
}

const IconDisplay: FC<PropsIconDisplay> = ({iconLabel}) => {

    return (
        <>
            {selectIcons.length > 0 && selectIcons
                .filter(item => item.label === iconLabel)
                .map((item, index) =>
                <div key={index}>{item.component}</div>
            )
            }
        </>
    )
}

export default IconDisplay