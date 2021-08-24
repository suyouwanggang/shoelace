import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlDatePanel from './date-panel';

describe('<sl-date-panel>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-date-panel></sl-date-panel> `);

    expect(el).to.exist;
  });
});
