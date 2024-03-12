import { getAppConfigData } from '@Redux';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface DeviceInfo {
    brand: string;
    model: string;
    platform: string;
}

function DeviceInfo() {
    const dispatch = useDispatch()

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const regex = /\(([^)]+)\)/;
        const match = regex.exec(userAgent);
        // console.log( "match===", match )
        if (match && match.length > 1) {
            // console.log("cameeeeeee")
            // console.log("match[1].split(';')==",match[1].split(';'))
            const deviceInfo = match[1].split(';');
            // console.log("deviceInfo[0].trim()", deviceInfo[0].trim())
            // console.log("deviceInfo[1].trim()", deviceInfo[1].trim())

            const brand = deviceInfo[0].trim();
            const model = deviceInfo[1].trim();
            dispatch(getAppConfigData({ brand, model, platform }))
        }
    }, []);

    return (
        <></>
    );
}

export default DeviceInfo
