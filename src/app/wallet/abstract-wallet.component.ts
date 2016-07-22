import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { IWallet, MoneyService, LocalWalletService } from '../core';

export class AbstractWalletComponent {

  wallet: IWallet;

  private sub: Subscription;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public moneyService: MoneyService,
    public localWalletService: LocalWalletService) { }

  ngOnInit() {
    this.sub = this.localWalletService.src$.subscribe(wallet => this.wallet = wallet);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
