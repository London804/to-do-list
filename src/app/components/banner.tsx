import React from 'react';
import './banner.scss';

interface BannerProps {
    message: string;
    type: 'success' | 'error' | 'warning';
}

export const Banner: React.FC<BannerProps> = ({ message, type }) => {
    return (
        <section className='banner'>
            <div className={`banner-${type}`}></div>
            <div className='u-fillRemaining'>
                {message}
            </div>
        </section>
    );
};

export default Banner;
