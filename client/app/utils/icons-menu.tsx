import React, {FC} from 'react';
import * as Icons from '@mui/icons-material';

interface PropsIconDisplay {
    iconName: string;
}

const IconDisplay: FC<PropsIconDisplay> = ({iconName}) => {

    const Icon = Icons[iconName]

    return (
        <>
        {Icon && <Icon/>}
        </>
    )
}

export default IconDisplay