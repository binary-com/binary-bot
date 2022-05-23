import React from 'react';
import Hero from './Hero.jsx';
import SwitchSection from './SwitchSection.jsx';
import Carousel from './Carousel.jsx';
import CardSection from './Card.jsx';
import WaitSection from './WaitSection.jsx';
import ChooseSection from './ChooseSection.jsx';
import Footer from './Footer.jsx';
import CarouselTitle from './CarouselTitle.jsx';

// eslint-disable-next-line arrow-body-style
const BotLanding = () => (
    <div>
        <Hero />
        <SwitchSection />
        <CarouselTitle />
        <Carousel />
        <ChooseSection />
        <CardSection />
        <WaitSection />
        <Footer />
    </div>
);

export default BotLanding;
