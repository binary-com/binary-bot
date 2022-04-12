import React from 'react';
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";
import { get as getStorage, set as setStorage } from '../../../../../common/utils/storageManager';
import { translate } from '../../../../../common/utils/tools';
import { getDefaultEndpoint, getServerAddressFallback, getAppIdFallback, getLanguage } from '../../api';
import { isLoggedIn } from '../../utils';
import useLogout from '../../../../../common/hooks/useLogout';

const getError = (server) => {
	return <>Unable to connect to <b>{server}</b>. Switching connection to default endpoint.</>
}

let api; // to close the error connection
const Endpoint = () => {
	const [server, setServer] = React.useState('frontend.binaryws.com');
	const [app_id, setAppId] = React.useState('');
	const [has_error, setError] = React.useState('');
	const [is_connected, setConnected] = React.useState(false);
	const logout = useLogout();


	React.useEffect(() => {
		$(".barspinner").hide();
		setServer(getStorage('config.server_url') || getDefaultEndpoint().url);
		setAppId(getStorage('config.app_id') || getDefaultEndpoint().appId);
	}, [])

	const checkConnection = async (appId, apiUrl) => {
		try {
			if (api?.disconnect) {
				api.disconnect();
			}

			const socket_url = `wss://${apiUrl || getServerAddressFallback()}/websockets/v3?app_id=${appId || getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

			api = new DerivAPIBasic({
				connection: new WebSocket(socket_url),
			});

			api.onOpen().subscribe(() => {
				setConnected(true);
			})

			api.onClose().subscribe(() => {
				setError(getError(apiUrl));
				resetEndpoint();
			})
			
		} catch (e) {
			setError(getError(apiUrl));
			resetEndpoint();
			checkConnection(getDefaultEndpoint().appId, getDefaultEndpoint().url);
		}
	}

	const onSubmit = (e) => {
		setError('');
		setConnected(false);
		e.preventDefault();

		if (server == getStorage('config.server_url') && app_id == getStorage('config.app_id')) return;

		setStorage('config.server_url', server);
		setStorage('config.app_id', app_id);

		const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w-._~:?#[\]@!$&'()*+,;=.]+$/;

		if (!urlReg.test(server)) {
			setError(translate('Please enter a valid server URL'));
			return;
		}

		checkConnection(app_id, server.trim());
		if(isLoggedIn()) {
			logout();
		}
	}

	const resetEndpoint = () => {
		setAppId(getDefaultEndpoint().appId);
		setServer(getDefaultEndpoint().url);
		setStorage('config.app_id', getDefaultEndpoint().appId);
		setStorage('config.server_url', getDefaultEndpoint().url);
	}

	const onReset = (e) => {
		e.preventDefault();
		setError('');
		resetEndpoint()
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
									<p>
										You have to register and get App ID before you can use different
										OAuth server for authentication. For more information refer to
										OAuth details on <a href="https://developers.binary.com/" target="_blank">https://developers.binary.com</a>
									</p>
									{has_error && <p id="error" className="error">{has_error}</p>}
									{is_connected && <p id="connected">Connected to the Endpoint <b>{getStorage('config.server_url')}!</b></p>}
								</td>
							</tr>
							<tr>
								<td>
									<button className="button" id="new_endpoint" type="submit" onClick={onSubmit}>Submit</button>
								</td>
								<td>
									<button className="button" id="reset" onClick={onReset}>Reset To Original Settings</button>
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
