'use strict';
module.exports = {
	history: {
		subscriptions: {
			r_100: {
				func: function r_100(api){
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
	authorize: {
		errors: {
			InvalidToken: {
				func: function InvalidToken(api){
					api.authorize('FakeToken');
				}
			}
		},
		responses: {
			realToken: {
				func: function realToken(api){
					api.authorize('nmjKBPWxM00E8Fh');
				}
			}
		},
	},
	proposal: {
		subscriptions: {
			r_100_digitodd: {
				func: function r_100_digitodd(api, global){
					api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				},
				maxResponse: 1,
				next: {
					buy: {
						responses: {
							buyOdd: {
								func: function buyOdd(api, global){
									api.buyContract(global.contract.id, global.contract.ask_price);
								},
								next: {
									proposal_open_contract: {
										subscriptions: {
											digitoddPurchase: {
												func: function digitoddPurchase(api, global){
													api.send({
														proposal_open_contract: 1,
														contract_id: global.oddPurchasedContract,
														subscribe: 1
													});
												},
												stopCondition: function(data){
													if (data.proposal_open_contract.is_expired){
														return true;
													} else {
														return false;
													}
												},
												next: {
													sell_expired: {
														responses: {
															sellOddContract: {
																func: function sellOddContract(api){
																	api.sellExpiredContracts();
																},
																next: {
																	proposal_open_contract: {
																		responses: {
																			expectOddContractResult: {
																				func: function expectOddContractResult(api, global){
																					api.getContractInfo(global.oddPurchasedContract);
																				},
																			},
																		},
																	},
																}
															},
														},
													},
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
				func: function r_100_digiteven(api, global){
					api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				},
				maxResponse: 1,
				next: {
					buy: {
						responses: {
							buyEven: {
								func: function buyEven(api, global){
									api.buyContract(global.contract.id, global.contract.ask_price);
								},
								next: {
									proposal_open_contract: {
										subscriptions: {
											digitevenPurchase: {
												func: function digitevenPurchase(api, global){
													api.send({
														proposal_open_contract: 1,
														contract_id: global.evenPurchasedContract,
														subscribe: 1
													});
												},
												stopCondition: function(data){
													if (data.proposal_open_contract.is_expired){
														return true;
													} else {
														return false;
													}
												},
												next: {
													sell_expired: {
														responses: {
															sellEvenContract: {
																func: function sellEvenContract(api, global){
																	api.sellExpiredContracts();
																},
																next: {
																	proposal_open_contract: {
																		responses: {
																			expectEvenContractResult: {
																				func: function expectEvenContractResult(api, global){
																					api.getContractInfo(global.evenPurchasedContract);
																				},
																			},
																		},
																	},
																}
															},
														},
													},
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
				func: function InvalidContractProposal(api){
					api.buyContract('uw2mk7no3oktoRVVsB4Dz7TQnFfABuFDgO95dlxfMxRuPUsz', 100);
				},
			}
		},
	},
	active_symbols: {
		responses: {
			allActiveSymbols: {
				func: function allActiveSymbols(api) {
					api.getActiveSymbolsBrief();
				}
			}
		}
	},
	asset_index: {
		responses: {
			allAssetIndices: {
				func: function allAssetIndices(api) {
					api.getAssetIndex();
				}
			}
		}
	},
	balance: {
		subscriptions: {
			balance: {
				func: function balance(api) {
					api.subscribeToBalance();
				},
				maxResponse: 1
			}
		}
	},
};
