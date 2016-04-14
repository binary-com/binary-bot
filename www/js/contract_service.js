var broadcast = function broadcast(eventName, data) {
	window.dispatchEvent(new CustomEvent(eventName, {detail: data}));
};

var ContractService = function ContractService() {

	var capacity = 600;

	var localHistory,
		contractCtrls = [];

	var utils = {
		broadcast: function broadcast(eventName, data) {
			window.dispatchEvent(new CustomEvent(eventName, {detail: data}));
		},
		zeroPad: function zeroPad(num) {
			if (num < 10) {
				return '0' + num;
			} else {
				return num.toString();
			}
		},
		getTickTime: function getTickTime(tick) {
			var date = new Date(tick * 1000);
			return date.getUTCHours() + ':' + utils.zeroPad(date.getUTCMinutes()) + ':' + utils.zeroPad(date.getUTCSeconds());
		},
		isDefined: function isDefined(obj) {
			if (typeof obj === 'undefined' || obj === null) {
				return false;
			} else {
				return true;
			}
		},
		setObjValue: function setObjValue(obj, attr, value, condition) {
			if (utils.isDefined(obj)) {
				if (utils.isDefined(condition)) {
					if (condition) {
						obj[attr] = value;
					}
				} else if (typeof obj[attr] === 'undefined') {
					obj[attr] = value;
				}
			}
		},
		fractionalLength: function fractionalLength(floatNumber) {
			var stringNumber = floatNumber.toString(),
				decimalLength = stringNumber.indexOf('.');
			return stringNumber.length - decimalLength - 1;
		},
		maxFractionalLength: function maxFractionalLength(floatNumbers) {
			var max = 0;
			floatNumbers.forEach(function (number) {
				max = (max < utils.fractionalLength(number)) ? utils.fractionalLength(number) : max;
			});
			return max;
		},
		lastDigit: function lastDigit(num) {
			return parseInt(num.toString()
				.slice(-1)[0]);
		},
		conditions: {
			CALL: function condition(barrier, price) {
				return parseFloat(price) > parseFloat(barrier);
			},
			PUT: function condition(barrier, price) {
				return parseFloat(price) < parseFloat(barrier);
			},
			DIGITMATCH: function condition(barrier, price) {
				return utils.lastDigit(barrier) === utils.lastDigit(price);
			},
			DIGITDIFF: function condition(barrier, price) {
				return utils.lastDigit(barrier) !== utils.lastDigit(price);
			},
			DIGITEVEN: function condition(barrier, price) {
				return utils.lastDigit(price) % 2 === 0;
			},
			DIGITODD: function condition(barrier, price) {
				return utils.lastDigit(price) % 2 !== 0;
			},
			DIGITUNDER: function condition(barrier, price) {
				return utils.lastDigit(price) < parseInt(barrier);
			},
			DIGITOVER: function condition(barrier, price) {
				return utils.lastDigit(price) > parseInt(barrier);
			},
			ASIANU: function condition(barrier, price) {
				return parseFloat(price) > parseFloat(barrier);
			},
			ASIAND: function condition(barrier, price) {
				return parseFloat(price) < parseFloat(barrier);
			},
		},
		digitTrade: function digitTrade(contract) {
			if (contract.type.indexOf('DIGIT') === 0) {
				return true;
			}
			return false;
		},
		asianTrade: function asianTrade(contract) {
			if (contract.type.indexOf('ASIAN') === 0) {
				return true;
			}
			return false;
		},
	};

	var LocalHistory = function LocalHistory(capacity) {

		var historyData = [];

		var updateTick = function updateTick(){
			var lastTick = historyData.slice(-1)[0].price;
			var previousTick = historyData.slice(-2)[0].price;
			var difference;
			if ( lastTick > previousTick ) {
				difference = 'up';	
			} else if ( lastTick < previousTick ) {
				difference = 'down';	
			} else {
				difference = '';	
			}
			utils.broadcast('tick:updated', {
				tick: lastTick,
				direction: difference
			});
		};

		var addTick = function addTick(tick) {
			if (parseInt(tick.epoch) > parseInt(historyData.slice(-1)[0].time)) {
				historyData.push({
					time: tick.epoch,
					price: tick.quote
				});
				historyData.shift();
				updateTick();
			}
		};

		var updateHistoryArray = function updateHistoryArray(historyArray, history) {
			var times = history.times,
				prices = history.prices;
			var compare = function compare(a, b) {
				var timea = parseInt(a.time),
					timeb = parseInt(b.time);
				if (timea < timeb) {
					return -1;
				} else if (timea > timeb) {
					return 1;
				} else {
					return 0;
				}
			};
			var seenTimes = [];
			times.forEach(function (time, index) {
				if (seenTimes.indexOf(time) < 0) {
					seenTimes.push(time);
					historyArray.push({
						time: time,
						price: prices[index]
					});
				}
			});
			times.sort(compare);
		};

		var addHistory = function addHistory(history) {
			historyData = [];
			updateHistoryArray(historyData, history);
			updateTick();
		};

		var getHistory = function getHistory(dataIndex, count, callback) {
			var end = capacity - dataIndex,
				start = end - count;
			if (start >= 0) {
				callback(historyData.slice(start, end));
			} else {
				callback([]);
			}
		};

		return {
			getHistory: getHistory,
			addTick: addTick,
			addHistory: addHistory,
		};

	};

	var ContractCtrl = function ContractCtrl(contract) {

		var broadcastable = true;

		var setNotBroadcastable = function setNotBroadcastable(){
			return broadcastable = false;
		};

		var isFinished = function isFinished(){
			return utils.isDefined(contract.exitSpotTime);
		};

		var getContract = function getContract(){
			return contract;
		};

		var hasEntrySpot = function hasEntrySpot() {
			if (utils.isDefined(contract.entrySpotIndex)) {
				return true;
			} else {
				return false;
			}
		};

		var hasExitSpot = function hasExitSpot() {
			if (utils.isDefined(contract.exitSpotIndex)) {
				return true;
			} else {
				return false;
			}
		};

		var betweenExistingSpots = function betweenExistingSpots(time) {
			if (hasEntrySpot() && time >= contract.entrySpotTime && (!hasExitSpot() || time <= contract.exitSpotTime)) {
				return true;
			} else {
				return false;
			}
		};

		var isSpot = function isSpot(i) {
			if (contract.showingEntrySpot && contract.entrySpotIndex === utils.getAbsoluteIndex(i)) {
				return true;
			}
			if (contract.showingExitSpot && contract.exitSpotIndex === utils.getAbsoluteIndex(i)) {
				return true;
			}
			return false;
		};

		var isEntrySpot = function isEntrySpot(time) {
			if (hasEntrySpot()) {
				if (time === contract.entrySpotTime) {
					return true;
				} else {
					return false;
				}
			} else {
				if (time >= contract.startTime) {
					return true;
				} else {
					return false;
				}
			}
		};

		var isExitSpot = function isExitSpot(time, index) {
			if (hasExitSpot()) {
				if (time === contract.exitSpotTime) {
					return true;
				} else {
					return false;
				}
			} else {
				if (hasEntrySpot() && index === contract.entrySpotIndex + contract.duration) {
					return true;
				} else {
					return false;
				}
			}
		};

		var addSpots = function addSpots(index, tickTime, tickPrice) {
			if (isEntrySpot(tickTime) || betweenExistingSpots(tickTime)) {
				if (isEntrySpot(tickTime)) {
					utils.setObjValue(contract, 'barrier', tickPrice, !utils.digitTrade(contract) && !utils.asianTrade(contract));
					utils.setObjValue(contract, 'entrySpotTime', tickTime, !hasEntrySpot());
				} else if (isExitSpot(tickTime, index)) {
					utils.setObjValue(contract, 'exitSpotTime', tickTime, !hasExitSpot());
				}
				utils.setObjValue(contract, 'entrySpotIndex', index, isEntrySpot(tickTime));
				utils.setObjValue(contract, 'exitSpotIndex', index, isExitSpot(tickTime, index));
				utils.setObjValue(contract, 'entrySpot', tickPrice, isEntrySpot(tickTime));
				utils.setObjValue(contract, 'exitSpot', tickPrice, isExitSpot(tickTime, index));
			}
		};

		var addRegions = function addRegions(lastTime, lastPrice) {
			if (hasEntrySpot()) {
				if (betweenExistingSpots(lastTime)) {
					if (utils.asianTrade(contract)) {
						if ( typeof contract.seenTicksCount === 'undefined' ){
							contract.seenTicksCount = 0;	
						}
						if ( contract.seenTicksCount === 0 ) {
							contract.barrier = parseFloat(lastPrice);
						} else {
							contract.barrier = ( parseFloat(lastPrice) + parseFloat(contract.barrier) * contract.seenTicksCount ) / ( contract.seenTicksCount + 1 )
						}
						contract.seenTicksCount += 1;
					}	
					if (utils.conditions[contract.type](contract.barrier, lastPrice)) {
						contract.result = 'win';
					} else {
						contract.result = 'lose';
					}
					if ( isFinished() && broadcastable ) {
						contractCtrls.forEach(function(contractctrl, index){
							var oldContract = contractctrl.getContract();
							if ( contract !== oldContract && !contractctrl.isFinished() ) {
								setNotBroadcastable();
							}
						});
						if ( broadcastable ) {
							if (utils.asianTrade(contract)) {
							contract.barrier = +parseFloat(contract.barrier).toFixed(3);
							}
							utils.broadcast("contract:finished", contract);
						}
					} else {
						utils.broadcast("contract:updated", contract);
					}
				}
			}
		};

		return {
			setNotBroadcastable: setNotBroadcastable,
			isFinished: isFinished,
			getContract: getContract,
			isSpot: isSpot,
			betweenExistingSpots: betweenExistingSpots,
			addSpots: addSpots,
			addRegions: addRegions,
		};

	};

	var updateContracts = function updateContracts(ticks) {
		var lastTime,
			lastPrice;

		ticks.forEach(function (tick, index) {
			var tickTime = parseInt(tick.time);
			var tickPrice = tick.price;
			contractCtrls.forEach(function (contract) {
				contract.addSpots(index, tickTime, tickPrice);
			});
			lastTime = parseInt(tick.time);
			lastPrice = tick.price;
		});

		contractCtrls.forEach(function (contract) {
			contract.addRegions(lastTime, lastPrice);
		});
	};

	var addTick = function addTick(tick) {
		if (utils.isDefined(localHistory)) {
			localHistory.addTick(tick);
			localHistory.getHistory(0, capacity, updateContracts);
		}
	};

	var addHistory = function addHistory(history) {
		if (!utils.isDefined(localHistory)) {
			localHistory = LocalHistory(capacity);
		}
		localHistory.addHistory(history);
		localHistory.getHistory(0, capacity, updateContracts);
	};

	var getDataIndex = function getDataIndex() {
		return dataIndex;
	};

	var addContract = function addContract(_contract) {
		if (_contract) {
			if (utils.digitTrade(_contract) || utils.asianTrade(_contract)) {
				_contract.duration -= 1;
			}
			contractCtrls.push(ContractCtrl(_contract));
			dataIndex = 0;
		}
	};

	var destroy = function destroy() {
		contractCtrls.forEach(function(contractctrl, index){
			contractctrl.setNotBroadcastable();
		});
		localHistory = null;
	};

	var getCapacity = function getCapacity() {
		return capacity;
	};

	return {
		destroy: destroy,
		addContract: addContract,
		addTick: addTick,
		addHistory: addHistory,
		getCapacity: getCapacity,
	};
};
