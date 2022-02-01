import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Tour from '../../components/tour';
import { get as getStorage, isDone, isLoggedInDeriv } from '../../../../../common/utils/storageManager';
import { updateShowTour } from '../../store/ui-slice';
import Footer from '../Footer';
import ToolBox from '../ToolBox';
import SidebarToggle from '../../components/SidebarToggle';

const TourPlacements = () => (
    <div>
        <FirstStepPlacement />
        <SecontStepPlacement />
        <ThirdStepPlacement />
        <ForthStepPlacement />
    </div>
);

const FirstStepPlacement = () => ( <div
    style={{
        position: 'fixed',
        width: '1em',
        height: '1em',
        top: '50%',
        left: '50%',
    }} 
    id='first-step-placement'
/>);

const SecontStepPlacement = () => ( <div
    style={{
        position: 'absolute',
        width: '1em',
        height: '1em',
        top: '70%',
        left: '50%',
    }} 
    id='second-step-placement'
/>);

const ThirdStepPlacement = () => {
    const style = 'top:23%;left:10%;position:absolute;width:1em;height:1em';
    return createReactNode('third-step-placement', style, 'blocklyTreeRoot', 'blocklyToolboxDiv');
};

const ForthStepPlacement = () => {
    const style = 
        `top:50px;left: ${isLoggedInDeriv() ? '84%': '90%'};position:absolute;width:1em;height:1em`;
    return createReactNode('forth-step-placement', style, isLoggedInDeriv() ? 
        'acc_switcher' : 'btn__login', isLoggedInDeriv() ? 
        'header__menu-right' : 'header__btn');
};

function createReactNode(id, style, current_node, parent_node){
    const new_account_position = document.createElement('div');
    new_account_position.id = id;
    new_account_position.style = style;
    const current_account_position = document.getElementsByClassName(current_node)[0];
    const parentDiv = document.getElementsByClassName(parent_node)[0];
    parentDiv.insertBefore(new_account_position, current_account_position); 
    return renderHTML(new_account_position.outerHTML);
}

const Main = ({api, blockly}) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        const days_passed =
        Date.now() >
        (parseInt(getStorage('closedTourPopup')) || 0) + 24 * 60 * 60 * 1000;
        dispatch(updateShowTour(isDone('welcomeFinished') || days_passed));
    }, []);
    return (
        <div className="main">
            <TourPlacements />
            <Tour />
            <ToolBox blockly={blockly} />
            <SidebarToggle />
            <Footer api={api} />
        </div>
    );
};

Main.propTypes = {
    api: PropTypes.object.isRequired,
    blockly: PropTypes.object.isRequired,
}
export default Main;

