import { initAppAxios } from '@peakee/api/axios';
initAppAxios('fetch' as never);

import { initApp } from '../../utils/bootstrap';
initApp();

import { createLogger, setDefaultLogger } from '@peakee/logger';
setDefaultLogger(createLogger('Background'));

import '@peakee/auth';
import './vendor/pdfjs';
