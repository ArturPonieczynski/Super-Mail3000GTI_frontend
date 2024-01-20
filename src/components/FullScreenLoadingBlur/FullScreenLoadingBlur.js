import React from 'react';
import {RotatingLines} from "react-loader-spinner";

export const FullScreenLoadingBlur = props => {

    const handleLoading = isLoading => {
        return {
            zIndex: isLoading ? 1 : undefined,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: isLoading ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backdropFilter: isLoading ? 'blur(5px)' : undefined,
        }
    };

    return (
        <div style={handleLoading(props.isLoading)}>
            <RotatingLines
                width='96'
                strokeColor='#000'
                strokeWidth='4'/>
        </div>
    )
};
