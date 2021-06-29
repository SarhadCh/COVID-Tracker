import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';

import './InfoBox.css';

function InfoBox({ title, cases, total, onClick, active}) {
    return (
        <>
            <Card onClick={onClick} className={`infoBox ${active && "infoBox--selected"}`}>
                <CardContent>
                    <Typography className='infoBox__title' color = 'textSecondary'> { title } </Typography>
                    <h2 className='infoBox__cases'> {cases} </h2>
                    <Typography className='infoBox__total' color = 'textSecondary'> { total } Total </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default InfoBox;
