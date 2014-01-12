//TODO (urgent): Still matching script HTML
//TODO: doesn't support regex patterns
//TODO: what to do about adding capture group in highlight()
//TODO: replace 'a' param in replace("", func);
//TODO: decorator pattern for implementating search features

chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.method === "match")
				match(request.args);
			else if (request.method === "nextMatch")
				nextMatch();
			else if (request.method === "prevMatch")
				prevMatch();
			return true;
		}
);

function match(searchText)
{
	patterns = removeDuplicates(parseSearchText(searchText));
	clearHighlights();
	$.each(patterns, function(i, pat) {
		highlightInBody(pat);
	});
}

function parseSearchText(searchText)
{
	return searchText.split("|");
}

function removeDuplicates(arr)
{
	unique = [];
	$.each(arr, function(i, elem) {
		if ($.inArray(elem, unique) === -1)
			unique.push(elem);
	});
	return unique;
}

function nextMatch()
{
	$("body").scrollTo(100);
}

function prevMatch()
{
	alert("<p>" + document.body.outerHTML + " </p>");
}

function highlightInBody(pattern)
{
	re = new RegExp("(" + pattern + ")", "gi");
	$.each(getBodyTextNodes(re), function(i, textNd)
	{
		if (textNd.parentNode)
		{
			textNd.parentNode.innerHTML = textNd.parentNode.innerHTML.replace(
					re, "<span class='cps_hl'>$1</span>");
		}
	});
	return this;
}

ignoreTags = {
	"STYLE": 0, "SCRIPT": 0, "NOSCRIPT": 0, "IFRAME": 0, "OBJECT": 0
};

function getBodyTextNodes(regex)
{
	walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,
			function(node)
			{
				if (!(node.tagName in ignoreTags)
						&& regex.test(node.textContent))
					return NodeFilter.FILTER_ACCEPT;
				else
					return NodeFilter.FILTER_SKIP;
			},
			false);
	ndList = [], nd = null;
	while (walk.nextNode())
		ndList.push(walk.currentNode);
	return ndList;
}

function clearHighlights()
{
	$(".cps_hl").each(function(i, elem)
	{
		$(this).replaceWith($(this).text());
	});
}