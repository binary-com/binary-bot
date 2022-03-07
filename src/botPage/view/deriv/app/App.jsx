import React from "react";
import { TrackJS } from "trackjs";
import trackjs_config from "../../trackJs_config";
import GTM from "../../../../common/gtm";
import { symbolPromise } from "../../shared";
import Routes from "../routes";

// Todo create symbol slice and update/add info from here;
const App = () => {
  const [has_symbols, setHasSymbols] = React.useState(false);
  TrackJS.install(trackjs_config);
  GTM.init();
  $.ajaxSetup({
    cache: false,
  });

  React.useEffect(() => {
    symbolPromise.then(() => {
      setHasSymbols(true);
    });
  }, [])

  if (!has_symbols) return null; // Todo: add fallback

  return (
    <Routes />
  )
}

export default App;
