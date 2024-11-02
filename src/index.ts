import router from './router';
import './utils/helpers';
import './static/styles/base/main.scss';
import './static/styles/feedback/modal.scss';
import './static/styles/feedback/popover.scss';

// @ts-ignore
window.router = router;

router.start();
