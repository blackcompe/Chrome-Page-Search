function sendContentScriptMessage(methodName, methodArgs)
{
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id,
				{
					method: methodName,
					args: methodArgs
				}
		);
	});
}

function setUIHandlers()
{
	$("#search_fld").keyup(function()
	{
		sendContentScriptMessage("match", $(this).val().toString());
	});
	$("#next_btn").click(function()
	{
		sendContentScriptMessage("nextMatch");
	});
	$("#prev_btn").click(function()
	{
		sendContentScriptMessage("prevMatch");
	});
}

$(document).on('ready', function() {
	setUIHandlers();
});
