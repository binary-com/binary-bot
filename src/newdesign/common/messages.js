var consts = {
	balance: 212312,
	loginid: 'CR384605',
}
module.exports = {
	authorize: {
		success: {
			"authorize":{
				"currency":"USD",
				"email":"email@example.com",
				"scopes":["read","trade"],
				"balance": consts.balance,
				"landing_company_name":"costarica",
				"fullname":"Mr Name Sur",
				"loginid": consts.loginid,
				"is_virtual":0
			},
			"echo_req":null,
			"msg_type":"authorize"
		},
		failure: {
			"error":{
				"message":"The token is invalid.",
				"code":"InvalidToken"
			},
			"msg_type":"authorize"
		}
	}
};
