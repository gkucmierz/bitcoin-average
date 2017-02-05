import { BitcoinAveragePage } from './app.po';

describe('bitcoin-average App', function() {
  let page: BitcoinAveragePage;

  beforeEach(() => {
    page = new BitcoinAveragePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
