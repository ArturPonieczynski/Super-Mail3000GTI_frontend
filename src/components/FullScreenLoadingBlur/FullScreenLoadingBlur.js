import React from 'react';
import {RotatingLines} from "react-loader-spinner";

export const FullScreenLoadingBlur = props => {

    const handleLoading = isLoading => {
        return isLoading ? {
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
        } : {
            display: 'none'
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
