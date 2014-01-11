//decorator pattern here
function parseSearchPatterns(text)
{
	return text.split(" ");
}

function sendContentScriptMessage(methodName, methodArgs)
{
	chrome.tabs.getSelemected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id,
				{method: methodName, args: methodArgs}
		);
	});
}

function setHandlers()
{
	$("#search_fld").on("keyup", function()
	{
		pats = parseSearchPatterns($(this).val().toString());//[];
		/*
		 $.each(parseSearchPatterns($(this).val().toString()),
		 function(i, elem) {
		 if ($.inArray(elem, pats) === -1)
		 pats.push(elem);
		 }
		 );
		 */
		sendContentScriptMessage("match", pats);
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
	setHandlers();
});
