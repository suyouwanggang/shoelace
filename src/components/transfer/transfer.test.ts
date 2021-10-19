import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlTransfer from './transfer';

describe('<sl-transfer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-transfer></sl-transfer> `);

    expect(el).to.exist;
  });
});
