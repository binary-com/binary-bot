import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tour from '../../components/tour';
import { get as getStorage, isDone } from '../../../../../common/utils/storageManager';
import { updateShowTour } from '../../store/ui-slice';
import Footer from '../Footer';
import ToolBox from '../ToolBox';
import SidebarToggle from '../../components/SidebarToggle';

const WelcomeTour = () => ( <div
    style={{
        position: 'fixed',
        width: '1em',
        height: '1em',
        top: '50%',
        left: '50%',
    }} 
    id='welcome-tour'
/>);

const Workspace = () => ( <div
    style={{
        position: 'absolute',
        width: '1em',
        height: '1em',
        top: '70%',
        left: '50%',
    }} 
    id='workspace'
/>);

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
            <WelcomeTour />
            <Workspace />
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

