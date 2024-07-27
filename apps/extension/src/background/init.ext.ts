import { initAppAxios } from '@peakee/api/axios';
initAppAxios('fetch');

import { createLogger, setDefaultLogger } from '@peakee/logger';
setDefaultLogger(createLogger('Background'));

import '@peakee/config';
import '@peakee/auth';
import './vendor/pdfjs';

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: 'open-side-panel',
		title: 'Open Peakee Panel',
		contexts: ['all'],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (tab && info.menuItemId === 'open-side-panel') {
		chrome.sidePanel.open({ windowId: tab.windowId });
	}
});
