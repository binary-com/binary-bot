import React from 'react';
import renderHTML from 'react-render-html';
import { useSelector } from "react-redux";
import { useEffect } from 'react';

const FirstStepTarget = () => ( <div
    style={{
        position: 'absolute',
        width: '1em',
        height: '1em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }} 
    id='first-step-target'
/>);

const SecontStepTarget = () => ( <div
    style={{
        position: 'absolute',
        width: '1em',
        height: '1em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }} 
    id='second-step-target'
/>);

const ThirdStepTarget = () => {
    const style = 'top:23%;left:10%;position:absolute;width:1em;height:1em';
    return createReactNode('third-step-target', style, 'blocklyTreeRoot', 'blocklyToolboxDiv');
};

const ForthStepTarget = () => {
  const { is_logged } = useSelector((state) => state.client);

    const style = 
        `top:50px;left: ${is_logged ? '84%': '90%'};position:absolute;width:1em;height:1em`;
    return createReactNode('forth-step-target', style, is_logged ? 
        'acc_switcher' : 'btn__login', is_logged ? 
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

const TourTargets = () => {
    const { is_header_loaded } = useSelector(state=>state.ui);

    useEffect(()=>{

    },[is_header_loaded]);

    return is_header_loaded && 
    <div>
        <FirstStepTarget />
        <SecontStepTarget />
        <ThirdStepTarget />
        <ForthStepTarget />
    </div>
};

export default TourTargets;