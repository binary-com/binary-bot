import React from 'react';
import { get as getStorage, set as setStorage } from '../../../../../common/utils/storageManager';
import { generateWebSocketURL, getDefaultEndpoint, generateTestDerivApiInstance } from '../../../../../common/appId';
import { translate } from '../../../../../common/utils/tools';
import { Link } from 'react-router-dom';

const MessageProperties = {
  connected: () => `<b>Connected to the Endpoint ${getStorage('config.server_url')}!</b>`,
  error: () => `Unable to connect to ${getStorage('config.server_url')}. Switching connection to default endpoint.`,
};

let api; // to close the error connection
const Endpoint = () => {

  React.useEffect(() => {
    $(".barspinner").hide();
    $('#error').hide();
    $('#connected').hide();
    $('#new_endpoint').click(addEndpoint);
    $('#reset').click(resetEndpoint);
    init();
  }, [])

  const checkConnection = async (appId, apiUrl) => {
    if (api && api.disconnect) {
      api.disconnect();
    }
    api = generateTestDerivApiInstance({
      appId,
      apiUrl: generateWebSocketURL(apiUrl),
    });
    try {
      await api.ping();
      $('#connected')
        .html(MessageProperties.connected())
        .show();
    } catch (e) {
      $('#error')
        .html(MessageProperties.error())
        .show();
      resetEndpoint();
      init();
      checkConnection(getDefaultEndpoint().appId, getDefaultEndpoint().url);
    }
  }

  const init = () => {
    const serverUrl = getStorage('config.server_url');
    $('#server_url').val(serverUrl || getDefaultEndpoint().url);
    $('#app_id').val(getStorage('config.app_id') || getDefaultEndpoint().appId);
  }

  const addEndpoint = (e) => {
    $('#error').hide();
    $('#connected').hide();
    e.preventDefault();
    const serverUrl = $('#server_url').val();
    const appId = $('#app_id').val();
    setStorage('config.server_url', serverUrl);
    setStorage('config.app_id', appId);

    const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w-._~:?#[\]@!$&'()*+,;=.]+$/;

    if (!urlReg.test(serverUrl)) {
      $('#error')
        .html(translate('Please enter a valid server URL'))
        .show();
      return;
    }

    checkConnection(appId, serverUrl);
  }

  const resetEndpoint = () => {
    setStorage('config.app_id', getDefaultEndpoint().appId);
    setStorage('config.server_url', getDefaultEndpoint().url);
  }

  return (
    <div>
      <div id="header">
        <div className="left-header">
          <div className="logo-wrapper">
            <a href="https://www.binary.com" target="blank" id="logo">
              <div className="logo-parent">
                <div className="logo">
                  <img className="responsive" src="image/binary-style/logo/symbol.svg" alt="Binary logo" />
                </div>
                <div className="binary-logo-text">
                  <img className="responsive" src="image/binary-style/logo/type.svg" alt="Binary logo" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>


      <div id="content-holder">
        <div className="container">
          <h1>Change API Endpoint</h1>
          <div className="endpoint-form-container">
            <form>
              <table id="details" style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td><b>Server</b></td>
                    <td>
                      <input type="text" id="server_url" value="frontend.binaryws.com" maxLength="30" onChange={e => { }} />
                      <p className="hint no-margin">e.g. frontend.binaryws.com</p>
                    </td>
                  </tr>
                  <tr>
                    <td><b>O Auth App ID</b></td>
                    <td>
                      <input type="text" id="app_id" value="1" maxLength="5" onChange={e => { }} />
                      <p className="hint no-margin">You have to register and get App ID before you can use different OAuth server for authentication. For more information refer to OAuth details on https://developers.binary.com/.</p>
                      <p style={{ color: "red", fontSize: "0.8em" }} id="error">Unable to connect to Connect, fallback to default endpoint.</p>
                      <p id="connected"><b>Connected to the endpoint successfully!</b></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="button" id="new_endpoint" type="submit">Submit</button>
                    </td>
                    <td>
                      <button className="button" id="reset">Reset To Original Settings</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Endpoint;
