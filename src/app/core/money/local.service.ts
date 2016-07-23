import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LocalPublishService } from '../local-publish';
import { IWallet } from './money';

@Injectable()
export class LocalWalletService extends LocalPublishService<IWallet> { }
