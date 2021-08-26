import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlLayout from './layout';

describe('<sl-layout>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-layout></sl-layout> `);

    expect(el).to.exist;
  });
});
