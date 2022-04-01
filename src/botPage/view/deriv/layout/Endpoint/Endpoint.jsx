import React from 'react';
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";
import { get as getStorage, set as setStorage, syncWithDerivApp } from '../../../../../common/utils/storageManager';
import { AppConstants, logoutAllTokens } from '../../../../../common/appId';
import { translate } from '../../../../../common/utils/tools';
import { getDefaultEndpoint, getServerAddressFallback, getAppIdFallback, getLanguage } from '../../api';
import { isLoggedIn, updateTokenList } from '../../utils';
import { useDispatch } from 'react-redux';
import { resetClient } from '../../store/client-slice';

const MessageProperties = {
	connected: () => `<b>Connected to the Endpoint ${getStorage('config.server_url')}!</b>`,
	error: () => `Unable to connect to ${getStorage('config.server_url')}. Switching connection to default endpoint.`,
};

let api; // to close the error connection
const Endpoint = () => {
	const [server, setServer] = React.useState('frontend.binaryws.com');
	const [app_id, setAppId] = React.useState('');
	const dispatch = useDispatch()

	React.useEffect(() => {
		$(".barspinner").hide();
		$('#error').hide();
		$('#connected').hide();
		init();
	}, [])

	const checkConnection = async (appId, apiUrl) => {
		try {
			if (api && api.disconnect) {
				api.disconnect();
			}

			const socket_url = `wss://${apiUrl || getServerAddressFallback()}/websockets/v3?app_id=${appId || getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;
			const deriv_socket = new WebSocket(socket_url);

			const api = new DerivAPIBasic({
				connection: deriv_socket,
			});

			api.onOpen().subscribe(() => {
				$('#connected')
					.html(MessageProperties.connected())
					.show();
			})

			api.onClose().subscribe(() => {
				$('#error')
					.html(MessageProperties.error())
					.show();
				resetEndpoint();
			})
			
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
		setServer(serverUrl || getDefaultEndpoint().url);
		setAppId(getStorage('config.app_id') || getDefaultEndpoint().appId);
	}

	const addEndpoint = (e) => {
		$('#error').hide();
		$('#connected').hide();
		e.preventDefault();

		setStorage('config.server_url', server);
		setStorage('config.app_id', app_id);

		const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w-._~:?#[\]@!$&'()*+,;=.]+$/;

		if (!urlReg.test(server)) {
			$('#error')
				.html(translate('Please enter a valid server URL'))
				.show();
			return;
		}

		checkConnection(app_id, server);
		if(isLoggedIn()) {
			logout();
		}
	}

	const logout = () => {
		logoutAllTokens().then(() => {
			updateTokenList();
			setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, '');
			setStorage('active_loginid', null);
			syncWithDerivApp();
			dispatch(resetClient());
		})
	}

	const resetEndpoint = (e) => {
		e?.preventDefault?.();
		setAppId(getDefaultEndpoint().appId);
		setServer(getDefaultEndpoint().url);
		setStorage('config.app_id', getDefaultEndpoint().appId);
		setStorage('config.server_url', getDefaultEndpoint().url);
	}

	return (
		<div className="endpoint">
			<h1>Change API Endpoint</h1>
			<div className="endpoint__form-container">
				<form>
					<table id="details" style={{ width: "100%" }}>
						<tbody>
							<tr>
								<td><p>Server</p></td>
								<td>
									<input type="text" id="server_url" value={server} maxLength="30" onChange={e => setServer(e.target.value)} />
									<p className="hint no-margin">e.g. frontend.binaryws.com</p>
								</td>
							</tr>
							<tr>
								<td><p>OAuth App ID</p></td>
								<td>
									<input type="text" id="app_id" value={app_id} maxLength="5" onChange={e => setAppId(e.target.value)} />
									<p className="hint no-margin">You have to register and get App ID before you can use different OAuth server for authentication. For more information refer to OAuth details on https://developers.binary.com/.</p>
									<p style={{ color: "red", fontSize: "0.8em" }} id="error">Unable to connect to Connect, fallback to default endpoint.</p>
									<p id="connected"><b>Connected to the endpoint successfully!</b></p>
								</td>
							</tr>
							<tr>
								<td>
									<button className="button" id="new_endpoint" type="submit" onClick={(e) => addEndpoint(e)}>Submit</button>
								</td>
								<td>
									<button className="button" id="reset" onClick={(e) => resetEndpoint(e)}>Reset To Original Settings</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	)
}

export default Endpoint;
