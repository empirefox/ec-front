
import '@angular/core/src/facade/lang';
import 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'angular2-jwt'; // user
import 'jwt-simple'; // order
import 'lodash'; // product, util
import 'angular2-swiper';
require('!!style!css!swiper/dist/css/swiper.css');

// import 'cross-storage'; // xstorage

require('list-to-tree-lite'); // category
require('./vendor');
