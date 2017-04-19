import { JamDindingAnalog100Page } from './app.po';

describe('jam-dinding-analog100 App', () => {
  let page: JamDindingAnalog100Page;

  beforeEach(() => {
    page = new JamDindingAnalog100Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
