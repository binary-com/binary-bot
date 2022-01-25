import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Tour from "../../../tour";
import {
  get as getStorage,
  isDone,
} from "../../../../../common/utils/storageManager";
import { updateShowTour } from "../../store/ui-slice";
import Footer from "../Footer";
import ToolBox from "../ToolBox";
import SidebarToggle from '../../components/SidebarToggle';


const Main = ({api, blockly}) => {
  const { should_show_tour } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const days_passed =
      Date.now() >
      (parseInt(getStorage("closedTourPopup")) || 0) + 24 * 60 * 60 * 1000;
    dispatch(updateShowTour(isDone("welcomeFinished") || days_passed));
  }, []);
  return (
    <div className="main">
      {should_show_tour && <Tour />}
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

