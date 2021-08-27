import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlColumn from './column';

describe('<sl-column>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-column></sl-column> `);

    expect(el).to.exist;
  });
});
