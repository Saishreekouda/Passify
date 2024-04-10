import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const QRCODE = ({id, getRef}) => {
    return(
        <QRCode
        value={id}
        size={250}
        color="black"
        backgroundColor="white"
        getRef={getRef}
        />
        )
    }

export default QRCODE;