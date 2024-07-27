import { initAppAxios } from '@peakee/api/axios';
initAppAxios('fetch');

import { createLogger, setDefaultLogger } from '@peakee/logger';
setDefaultLogger(createLogger('Background'));

import '@peakee/config';
import '@peakee/auth';
import './vendor/pdfjs';
