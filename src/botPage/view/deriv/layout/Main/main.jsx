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

const Main = ({api, blockly}) => {
  const { show_tour } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const day_has_passed =
      Date.now() >
      (parseInt(getStorage("closedTourPopup")) || 0) + 24 * 60 * 60 * 1000;
    dispatch(updateShowTour(isDone("welcomeFinished") || day_has_passed));
  }, []);
  return (
    <div className="main">
      {show_tour && <Tour />}
      <ToolBox blockly={blockly} />
      <Footer api={api} />
    </div>
  );
};

Main.propTypes = {
    api: PropTypes.object.isRequired,
    blockly: PropTypes.object.isRequired,
}
export default Main;
