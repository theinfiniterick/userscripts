// ==UserScript==
// @name         YouTube - Guide
// @namespace    Nothing
// @version      1.0.0
// @description  2/15/2023, 3:56:52 PM
// @icon         data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAe1BMVEVHcEymAACFhYXkAAC/AADyAADTAAD/////Ly//AwPhBgbxAAAmAAD5AADxAADJAADVBATaDw+BAADTAgL/LCzWAADhCAjfGhr/KCjnAAD0AADOAAD/AAD/////9/f/7+//e3v/UFD/vr7/qan/PT3/39//kJD/Kir/zc0Q/tNHAAAAHHRSTlMALQOZg+HKD8j9S+wQ88ttWX4fO6+0imqYqbniBuNvagAAAZNJREFUWIXtlt1ygjAQhTdEaBOSQEQBNVGrrfX9n7ABRlvR/EhueuGZYRgg52MTluwCvPTSv1LCEKpo00jZtovF4n0sc69ta9k0Ja0QYsnIPpdrkeZEKdUdv6erhmvSn3ieCoHpXztWT4uotLz4Wfq8v1cz+FE+0a/UEMNqsl/l/QJM9w8hFDEAHDcDpQSDRMQA0jnMp37DXhxFAggFxG0P9+N0fqQSKuuw7TmAUEBpB2h99CJqRxoYgD5/eADYAzBBfDoBK5h5AHq3dwGWfoDWX455BAH09mgdlAUBHPMIBWh9eLyYGdSBgN3p4SARGoElgNAp2L9DGOD0bR0UAjjY7V0e+FLZnYhegEkh4vwjMZQugCuJLwBqfYEv+l4SKuuWdvC+XnU7UkRl7FTG7soVsKjCkiOAdUwApjKBjIlgbYprFQOQXYMQs4qsA9Dp/npokiYT6kubVk5LpqvfSIo8pBZfRbjA7KZVZYgWM7zMsk3O+V2f2nsI4TzdZNkSzwpa3drHfXOSvN3J3HR32y+9FKEfw10c+oXU9S4AAAAASUVORK5CYII=
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/live_chat?*
// @exclude      https://www.youtube.com/live_chat_replay?*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

	function addStyles() {

		GM_addStyle(`

			/* *** TOOLTIPS *** */

			/* Normal Tooltips -- Hide */
			tp-yt-paper-tooltip {
				display: none !important;
			}

			/* *** HEADER *** */

			/* Header :: Search :: Voice Search Button -- Hide */
			#voice-search-button.ytd-masthead {
				display: none !important;
			}

			/* Header :: Search :: Box (focused) :: Dropdown Menu :: "Report search predictions" Link -- Hide */
			.sbsb_c:has(.sbfl_a) {
				display: none !important;
			}

			/* *** GUIDE *** */

			/* Mini Guide :: Menu Item :: Shorts -- Hide */
			ytd-mini-guide-entry-renderer[aria-label="Shorts"] {
				display: none !important;
			}

			/* Add margin to bottom of guide to compensate for removed sections */
			ytd-guide-renderer > div#sections {
				margin-bottom: 25px !important;
			}

			/* Increase width of guide from 240px to 265px */
			#contentContainer.tp-yt-app-drawer, ytd-guide-renderer {
				width: 265px !important;
			}

			/* Remove bottom border between sections */
			#sections.ytd-guide-renderer > .ytd-guide-renderer:not(:last-child) {
				border-bottom: none !important;
			}

			/* Section 1 :: Hide menu items "Shorts", "Your videos" and "Liked videos" */
			ytd-guide-entry-renderer[guide-refresh]:has(a#endpoint[title="Shorts"]),
			ytd-guide-entry-renderer[guide-refresh]:has(a#endpoint[title="Your videos"]),
			ytd-guide-entry-renderer[guide-refresh]:has(a#endpoint[title="Liked videos"]),

			/* Section 2 :: Menu Item :: "Browse channels" -- Hide */
			ytd-guide-entry-renderer[guide-refresh]:has(a#endpoint[title="Browse channels"]) {
				display: none !important;
			}

			/* Section 1 :: Collapsible Section (first) -- Remove top border, margin and padding */
			ytd-guide-collapsible-section-entry-renderer:first-of-type {
				border-top: none !important;
				margin-top: 0 !important;
				padding-top: 0 !important;
			}

			/* Section 2 :: Reduce top padding from 12px to 8px */
			ytd-guide-section-renderer:nth-of-type(2) {
				padding-top: 8px !important;
			}

			/* Section 2 :: Header -- Set height of filter box parent */
			ytd-guide-section-renderer:nth-of-type(2) > h3 {
				height: 44px !important;
			}

			/* Section 2 :: Header :: Formatted String -- Hide the initial content of the filter box parent */
			ytd-guide-section-renderer:nth-of-type(2) > h3 > yt-formatted-string {
				display: none !important;
			}

			/* Section 2 :: Menu Item :: "Show N more", "Show less" Items -- Hide */
			ytd-guide-section-renderer:nth-of-type(2) ytd-guide-collapsible-entry-renderer ytd-guide-entry-renderer#expander-item,
			ytd-guide-section-renderer:nth-of-type(2) ytd-guide-collapsible-entry-renderer ytd-guide-entry-renderer#collapser-item {
				display: none !important;
			}

			/* Sections 3 or above -- Hide */
			ytd-guide-section-renderer:nth-of-type(n+3) {
				display: none !important;
			}

			/* Footer -- Hide */
			ytd-guide-renderer #footer {
				display: none !important;
			}

			/* Filter Box :: Container */
			#container.ytd-searchbox.filter-div {
				position: relative;
				align-items: stretch;
				margin: 0 4px 8px 2px;
				border-radius: 15px;
				padding-inline: 11px 6px;
				padding-block: 6px;
				height: 20px;
				border: 1px solid var(--ytd-searchbox-legacy-border-color);
			}

			/* Filter Box :: Container (focused) */
			#container.ytd-searchbox.filter-div:focus-within {
				border-color: #1c62b9 !important;
			}

			/* Filter Box :: Input */
			#search.ytd-searchbox.filter-input {
				outline: none;
				margin: 0;
				width: 100%;
				font-family: Roboto, Noto, sans-serif;
				background-color: transparent;
				border: none;
				padding: 0 3px;
				height: auto;
				font-size: 14px;
			}

			#no-matches-message {
				display: none;
				color: #f1f1f1;
				text-align: center;
				font-size: 14px;
				margin-top: 20px;
				line-height: 20px;
				font-weight: normal;
			}

		`);

	}

	function addFilterBoxListeners() {

		// Get list of subscribed channels
		channelList = [ ...subsList.querySelectorAll(`ytd-guide-entry-renderer:not([id]) > a:not([href="/feed/guide_builder"])`) ];

		// Update hidden state of channels at the end of each keypress
		filterInput.onkeyup = function() {

			if (filterInput.value.toLowerCase() === searchQuery) return;

			// Show all if searchBox.value != searchQuery
			if (filterInput.value.length != searchQuery.length) channelList.forEach(n => n.parentElement.hidden = false);
			searchQuery = filterInput.value.toLowerCase();
			clearButton.hidden = filterInput.value.length === 0;

			// Hide not matching
			channelList
				.filter(n => !n.parentElement.hidden)
				.filter(n => n.title.toLowerCase().search(searchQuery) === -1)
				.forEach(n => n.parentElement.hidden = true);

			matchCount = channelList.filter(n => !n.parentElement.hidden).length;

			(matchCount == 0) ? noMatchesMessage.style.display = 'block' : noMatchesMessage.style.display = 'none';

		};

		clearButton.onclick = function() {
			filterInput.value = '';
			filterInput.onkeyup();
		}

		// Add event if user subscribes to a channel
		subsList.addEventListener("DOMNodeInserted", (event) => {
			if (event.target.nodeName.toLowerCase() === "#text" && event.target.textContent.trim().length !== 0) {
				channelList = [ ...subsList.querySelectorAll(`ytd-guide-entry-renderer:not([id]) > a:not([href="/feed/guide_builder"])`) ];
				filterInput.onkeyup();
			}
		}, false);

		// Add event if user unsubscribes from a channel
		subsList.addEventListener("DOMNodeRemoved", (event) => {
			if (event.target.nodeName.toLowerCase() === "ytd-guide-entry-renderer") {
				channelList = [ ...subsList.querySelectorAll(`ytd-guide-entry-renderer:not([id]) > a:not([href="/feed/guide_builder"])`) ];
				filterInput.onkeyup();
			}
		}, false);

		// Add event listener to focus the input field when the guide is opened
		document.addEventListener('yt-guide-toggle', () => {
			if (document.querySelector('tp-yt-app-drawer[opened]') !== null) filterInput.focus();
		});

	}

	function addChannelInputBox() {

		let filterDiv = document.createElement("div");

		filterDiv.id = "container";
		filterDiv.classList.add("style-scope", "ytd-searchbox", "filter-div");

		filterInput = document.createElement("input");
		filterInput.type = "text";
		filterInput.placeholder = "Search for channel"
		filterInput.id = "search";
		filterInput.classList.add("ytd-searchbox", "filter-input");

		// Create clear button
		searchQuery = document.createElement("span");
		clearButton = document.createElement('button');
		clearButton.type = 'button';
		clearButton.style = "display: flex; z-index: 100; box-shadow: none !important; background-color: transparent !important; border: 1px solid transparent; cursor: pointer; outline: 0; margin-top: 2px;";
		clearButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="12" height="12"><path fill="#f2f2f2" d="M250.82 250.5c-.3.06-.4.38-.24.62.33.47.84.86 1.25 1.27l2.73 2.73.64.64c.06.06.22.17.2.26-.04.12-.22.24-.3.32l-.76.76-2.77 2.77-.86.86c-.16.16-.28.36-.16.58.16.28.48.2.68.02.5-.48.99-.99 1.48-1.48l2.43-2.43.62-.63c.06-.05.15-.19.24-.19.1 0 .22.17.28.24l.73.73 2.88 2.88.82.82c.14.14.3.28.51.22a.39.39 0 0 0 .24-.55c-.17-.33-.58-.62-.84-.88l-3.07-3.07-.73-.73c-.06-.06-.24-.18-.21-.28.05-.2.43-.46.57-.6l1.5-1.5 1.3-1.3.96-.97c.16-.16.37-.32.5-.51.18-.3-.1-.7-.45-.58-.17.06-.3.22-.41.34l-.69.69-2.58 2.58-.97.97c-.07.07-.25.32-.36.3-.11-.04-.23-.2-.3-.28l-.76-.75-2.73-2.73-.86-.86c-.14-.14-.3-.31-.51-.27z" transform="translate(-250 -250)"/></svg>`;
		clearButton.hidden = true;

		subsList = [ ...document.querySelectorAll("div#sections h3:not([hidden]) + div#items") ]
            .filter(n => n.querySelector("ytd-guide-collapsible-entry-renderer > div#expanded") || n.querySelector(`ytd-guide-entry-renderer > a[href="/feed/guide_builder"]`))
            .pop();

		// Add to document
		subsList.parentElement.querySelector("h3").innerHTML = '';
		subsList.parentElement.querySelector("h3").appendChild(filterDiv);
		filterDiv.appendChild(filterInput);
		filterDiv.appendChild(clearButton);

		noMatchesMessage = document.createElement('div');

		subsList.parentElement.querySelector("h3").appendChild(noMatchesMessage);

		noMatchesMessage.id = 'no-matches-message';
		noMatchesMessage.innerText = 'No matching channels';

		setTimeout(() => {
			filterInput.focus();
			subsList.parentElement.querySelector("h3").style.visibility = 'visible';
		});

	}

	function onReadyChangeGuide() {

		function callbackFunction() {

			const expandElement = guideInnerContent.querySelector("ytd-guide-section-renderer:nth-of-type(2) > div#items > ytd-guide-collapsible-entry-renderer[can-show-more] > ytd-guide-entry-renderer > a#endpoint");

			// If expand element is not in the DOM yet, return
			if (!expandElement) return;

			// Remove event listener
			document.removeEventListener('yt-guide-toggle', callbackFunction, { once: true });

			// Disconnect mutation observer
			observer.disconnect();

			// Trigger the click event to expand the subscriptions section
			expandElement.click();

			// Add input box elements to the DOM
			addChannelInputBox();

			// Add event listeners to handle changes to the input box text
			addFilterBoxListeners();

		}

		const isExpanded = document.querySelector("ytd-guide-renderer > div#sections > ytd-guide-section-renderer:nth-of-type(2) > div#items > ytd-guide-collapsible-entry-renderer[expanded]") !== null;

		if (isExpanded) {
			console.log('function: onReadyChangeGuide: section already expanded');
			return;
		}

		const guideInnerContent = document.querySelector('div#guide-content > div#guide-inner-content');

		document.addEventListener('yt-guide-toggle', callbackFunction, { once: true });

		const observer = new MutationObserver(callbackFunction);

		observer.observe(guideInnerContent, { subtree: true, childList: true });

	}

	function miniGuide_addHistoryIcon() {

		// console.log('function: miniGuide_addHistoryIcon: execute');

		function observerCallback() {

			// console.log('function: miniGuide_addHistoryIcon: observerCallback');

			const libraryRenderer = guideRenderer.querySelector('ytd-mini-guide-entry-renderer[aria-label="Library"]');

			if (!libraryRenderer) return;

			observer.disconnect();

			const guideItems = document.querySelector('ytd-mini-guide-renderer > div#items');

			const node = guideItems.querySelector('ytd-mini-guide-entry-renderer[aria-label="Library"]').cloneNode(true);

			guideItems.appendChild(node);

			const link = node.querySelector('a#endpoint');
			const icon = node.querySelector('a#endpoint > yt-icon');
			const title = node.querySelector('a#endpoint > span.title');

			node.setAttribute("aria-label", "History");

			link.title = 'History';
			link.href = '/feed/history';

			icon.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;" class="style-scope yt-icon"><g class="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" class="style-scope yt-icon"></path></g></svg>';;

			title.innerText = 'History';

		}

		const guideRenderer = document.querySelector('ytd-mini-guide-renderer');

		var observer = new MutationObserver(observerCallback);

		observer.observe(guideRenderer, { subtree: true, childList: true });

	}

	var matchCount = null;
	var subsList = null;
	var channelList = null;
	var searchQuery = null;
	var filterInput = null;
	var clearButton = null;
	var noMatchesMessage = null;

	addStyles();

	document.addEventListener('DOMContentLoaded', () => {

		// When the guide subscriptions have loaded, expand it and add the channel filter box
		setTimeout(onReadyChangeGuide, 150);

		// When the mini guide is loaded, add the history icon to it
		if (document.location.pathname !== '/watch') miniGuide_addHistoryIcon();

	}, { once: true });

})();