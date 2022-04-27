import React from 'react';
import Hero from './Hero.jsx';
import SwitchSection from './SwitchSection.jsx';
import Carousel from './Carousel.jsx';
import WaitSection from './WaitSection.jsx';
import ChooseSection from './ChooseSection.jsx';
import Footer from './Footer.jsx';

// eslint-disable-next-line arrow-body-style
const BotLanding = () => (
    <div>
        <Hero />
        <SwitchSection />
        <Carousel />
        <WaitSection />
        <ChooseSection />
        <Footer />
    </div>
);

export default BotLanding;
