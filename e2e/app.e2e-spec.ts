import { EcFront2Page } from './app.po';

describe('ec-front2 App', () => {
  let page: EcFront2Page;

  beforeEach(() => {
    page = new EcFront2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
