import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const Qr = ({value}) => {
    return(
        <QRCode
        value={value}
        size={250}
        color="black"
        backgroundColor="white"
        />
        )
    }

export default Qr;