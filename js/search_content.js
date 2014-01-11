
//doesn't support regex patterns
function match(patterns)
{
	//highlighted = $("body").html();
	//alert($("body").html());
	/*
	 $.each(patterns, function(i, pat) {
	 regex = new RegExp(pat, "gi");
	 repl = "<font class=\"search\">" + pat + "</font>";
	 highlighted = highlighted.replace(regex, repl);
	 });
	 alert(highlighted);
	 $("body").html(highlighted);
	 */
}

function nextMatch()
{
	$("body").scrollTo(100);
}

function prevMatch()
{
	alert("<p>" + document.body.outerHTML + " < /p>");
}

chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.method === "match")
				match(request.args);
			else if (request.method === "nextMatch")
				nextMatch();
			else if (request.method === "prevMatch")
				prevMatch();
		}
);