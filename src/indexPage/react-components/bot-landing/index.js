import React from 'react';
import Hero from './Hero.jsx';
import SwitchSection from './SwitchSection.jsx';
import Carousel from './Carousel.jsx';
import CardSection from './Card.jsx';
import WaitSection from './WaitSection.jsx';
import ChooseSection from './ChooseSection.jsx';
import Footer from './Footer.jsx';
import CarouselTitle from './CarouselTitle.jsx';
import TakeDeriv from './TakeDeriv.jsx';

// eslint-disable-next-line arrow-body-style
const BotLanding = () => (
    <div>
        <Hero />
        <SwitchSection />
        <CarouselTitle />
        <Carousel />
        <ChooseSection />
        <TakeDeriv />
        <CardSection />
        <WaitSection />
        <Footer />
    </div>
);

export default BotLanding;
