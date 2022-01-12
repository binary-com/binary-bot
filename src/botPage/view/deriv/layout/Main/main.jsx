import React from 'react';
import {useDispatch} from 'react-redux';
import Tour from '../../../tour'
import { get as getStorage, isDone } from '../../../../../common/utils/storageManager';
import {updateShowTour} from '../../store/ui-slice';

const Main = ()=>{
    const dispatch = useDispatch()
    React.useEffect(()=>{
        const day_has_passed = Date.now() > (parseInt(getStorage('closedTourPopup')) || 0) + 24 * 60 * 60 * 1000;
        dispatch(updateShowTour(isDone('welcomeFinished') || day_has_passed))
    },[])
    return(
        <div className="main">
            <Tour />
        </div>
    )
}
export default Main;
