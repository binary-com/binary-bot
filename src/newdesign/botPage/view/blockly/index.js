var updateTokenList = function updateTokenList(tokenToAdd) {
	var tokenList = storageManager.getTokenList();
	blockly.WidgetDiv.hideIfOwner(blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST'));
	if (tokenList.length === 0) {
		$('#addAccount')
		.unbind('.addAccount')
		.bind('click.login', function(e){
			appId.redirectOauth();
		})
		.text('Login');
		$('#logout')
		.hide();
		global.lists.accounts = [
		[i18n._('Please add a token first'), '']
		];
		blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST')
		.setValue('');
		blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST')
		.setText(i18n._('Please add a token first'));
	} else {
		$('#addAccount')
		.unbind('.login')
		.bind('click.addAccount', function(e){
			addAccount();
		})
		.text('Add Token');
		$('#logout')
		.show();
		global.lists.accounts = [];
		tokenList.forEach(function (tokenInfo) {
			global.lists.accounts.push([tokenInfo.account_name, tokenInfo.token]);
		});
		var tokenInfoToAdd = tokenList[0];
		if (tokenToAdd !== undefined) {
			var tokenInfoIndex = storageManager.findToken(tokenToAdd);
			if (tokenInfoIndex >= 0) {
				tokenInfoToAdd = tokenList[tokenInfoIndex];
			}
		}
		if (blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST')
			.getValue() !== tokenInfoToAdd.token) {
			blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST')
		.setValue(tokenInfoToAdd.token);
	}
	if (blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST')
		.getText() !== tokenInfoToAdd.account_name) {
		blockly.mainWorkspace.getBlockById('trade')
	.getField('ACCOUNT_LIST')
	.setText(tokenInfoToAdd.account_name);
}
}
};

var addPurchaseOptions = function addPurchaseOptions() {
	var firstOption = {};
	var secondOption = {};
	var trade = blockly.mainWorkspace.getBlockById('trade');
	if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
		.getInputTargetBlock('CONDITION') !== null) {
		var condition_type = trade.getInputTargetBlock('SUBMARKET')
	.getInputTargetBlock('CONDITION')
	.type;
	var opposites = config.opposites[condition_type.toUpperCase()];
	global.lists.purchase_choices = [];
	opposites.forEach(function (option, index) {
		if (index === 0) {
			firstOption = {
				condition: Object.keys(option)[0],
				name: option[Object.keys(option)[0]],
			};
		} else {
			secondOption = {
				condition: Object.keys(option)[0],
				name: option[Object.keys(option)[0]],
			};
		}
		global.lists.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
	});
	var purchases = [];
	blockly.mainWorkspace.getAllBlocks()
	.forEach(function (block) {
		if (block.type === 'purchase') {
			purchases.push(block);
		}
	});
	purchases.forEach(function (purchase) {
		var value = purchase.getField('PURCHASE_LIST')
		.getValue();
		blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
		if (value === firstOption.condition) {
			purchase.getField('PURCHASE_LIST')
			.setText(firstOption.name);
		} else if (value === secondOption.condition) {
			purchase.getField('PURCHASE_LIST')
			.setText(secondOption.name);
		} else {
			purchase.getField('PURCHASE_LIST')
			.setValue(firstOption.condition);
			purchase.getField('PURCHASE_LIST')
			.setText(firstOption.name);
		}
	});
}
};

findTopParentBlock = function findTopParentBlock(block) {
		var pblock = block.parentBlock_;
		if (pblock === null) {
			return null;
		}
		while (pblock !== null) {
			block = pblock;
			pblock = block.parentBlock_;
		}
		return block;
	}