import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlDate from './date';

describe('<sl-date>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-date></sl-date> `);

    expect(el).to.exist;
  });
});
