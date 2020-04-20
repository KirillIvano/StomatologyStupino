import 'flexboxgrid2';
import 'babel-polyfill';
import 'fetch-polyfill';

import {pagesConfigs} from './pages';

import './common.less';
import {router} from './router';
import {initializeSlider} from './scripts/navbar';

initializeSlider();

router.initialize(
    document.getElementById('root'),
    pagesConfigs,
);
