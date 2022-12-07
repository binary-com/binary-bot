import React from 'react';
import MoveToDerivNav from './Navigation.jsx';
import Hero from './Hero.jsx';
import SwitchSection from './SwitchSection.jsx';
import Carousel from './Carousel.jsx';
import CardSection from './Card.jsx';
import WaitSection from './WaitSection.jsx';
import ChooseSection from './ChooseSection.jsx';
import Footer from './Footer.jsx';
import CarouselTitle from './CarouselTitle.jsx';
import TakeDeriv from './TakeDeriv.jsx';

const BinaryLanding = () => {
    const params = new URLSearchParams(window.location.search);
    const is_from_binary = params.get('source') === 'binary';

    return (
        <>
            <MoveToDerivNav isFromBinary={is_from_binary} />
            <Hero isFromBinary={is_from_binary} />
            <SwitchSection />
            <CarouselTitle />
            <Carousel />
            <ChooseSection />
            <TakeDeriv />
            <CardSection />
            <WaitSection />
            <Footer />
        </>
    )
}

export default BinaryLanding;
