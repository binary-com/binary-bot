module.exports = {
	authorize: {
		errors: {
			InvalidToken: {
				func: function InvalidToken(){
					api.authorize('FakeToken');
				}
			}
		},
		responses: {
			realToken: {
				func: function realToken(){
					api.authorize('c9A3gPFcqQtAQDW');
				}
			}
		},
	},
	history: {
		subscriptions: {
			r_100: {
				func: function r_100(){
					api.getTickHistory('R_100', {
						"end": "latest",
						"count": 600,
						"subscribe": 1
					});
				},
				maxResponse: 4
			}
		},
	},
	proposal: {
		subscriptions: {
			r_100_digitodd: {
				func: function r_100_digitodd(){
					api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				},
				maxResponse: 1,
				next: {
					buy: {
						responses: {
							buyOdd: {
								func: function buyOdd(oddContract){
									api.buyContract(oddContract.id, oddContract.ask_price);
								},
								next: {
									proposal_open_contract: {
										subscriptions: {
											digitoddPurchase: {
												func: function digitoddPurchase(contract){
													api.send({
														proposal_open_contract: 1,
														contract_id: contract,
														subscribe: 1
													});
												},
												stopCondition: function(data){
													if (data.proposal_open_contract.is_sold){
														return true;
													} else {
														return false;
													}
												}
											},
										},
									},
								}
							}
						},
					},
				}
			},
			r_100_digiteven: {
				func: function r_100_digiteven(){
					api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				},
				maxResponse: 1,
				next: {
					buy: {
						responses: {
							buyEven: {
								func: function buyEven(evenContract){
									api.buyContract(evenContract.id, evenContract.ask_price);
								},
								next: {
									proposal_open_contract: {
										subscriptions: {
											digitevenPurchase: {
												func: function digitevenPurchase(contract){
													api.send({
														proposal_open_contract: 1,
														contract_id: contract,
														subscribe: 1
													});
												},
												stopCondition: function(data){
													if (data.proposal_open_contract.is_sold){
														return true;
													} else {
														return false;
													}
												}
											},
										},
									},
								}
							}
						},
					},
				}
			},
		},
	},
	buy: {
		errors: {
			InvalidContractProposal: {
				func: function InvalidContractProposal(){
					api.buyContract('uw2mk7no3oktoRVVsB4Dz7TQnFfABuFDgO95dlxfMxRuPUsz', 100);
				},
			}
		}
	},
	proposal_open_contract: {
	},
};