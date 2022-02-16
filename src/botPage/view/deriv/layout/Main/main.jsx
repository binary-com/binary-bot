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
import BlockLyWorkspace from '../../components/blockly-workspace';
import _Blockly from "../../../blockly";
import LogTable from "../../../LogTable";
import { translate } from "../../../../../common/i18n";
import TradeInfoPanel from "../../../TradeInfoPanel";

const Main = () => {
  const blockly = new _Blockly();
  const dispatch = useDispatch();

  

  React.useEffect(() => {
    init();
  }, []);

  const init = () => {
    blockly.initPromise;

    const days_passed =
      Date.now() >
      (parseInt(getStorage("closedTourPopup")) || 0) + 24 * 60 * 60 * 1000;
    dispatch(updateShowTour(isDone("welcomeFinished") || days_passed));
  }

  return (
    <div className="main">
      <Header />
      <ToolBox blockly={blockly} />
      <BlockLyWorkspace blockly={blockly} />
      <SidebarToggle />
      <Footer />

      <span id="logPanel" className="draggable-dialog" title={translate("Log")}>
        <div id="logTable" className="logTable-scroll">
          <LogTable />
        </div>
      </span>

      <span id="summaryPanel" className="draggable-dialog" title={translate("Summary")}>
        <TradeInfoPanel />
      </span>
    </div>
  );
};

export default Main;
