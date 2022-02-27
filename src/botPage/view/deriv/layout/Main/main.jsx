import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  get as getStorage,
  isDone,
} from "../../../../../common/utils/storageManager";
import { updateShowTour } from "../../store/ui-slice";
import Footer from "../Footer";
import Header from "../Header";
import ToolBox from "../ToolBox";
import SidebarToggle from '../../components/SidebarToggle';
import { getRelatedDeriveOrigin } from "../../utils";


const Main = ({blockly}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const local_storage_sync = document.getElementById("localstorage-sync")
    if (local_storage_sync){
      local_storage_sync.src = `${getRelatedDeriveOrigin().origin}/localstorage-sync.html`
    }

    const days_passed =
      Date.now() >
      (parseInt(getStorage("closedTourPopup")) || 0) + 24 * 60 * 60 * 1000;
    dispatch(updateShowTour(isDone("welcomeFinished") || days_passed));
  }, []);
  return (
    <div className="main">
      <Header />
      <ToolBox blockly={blockly} />
      <SidebarToggle />
      <Footer/>
    </div>
  );
};

Main.propTypes = {
    blockly: PropTypes.object.isRequired,
}
export default Main;

