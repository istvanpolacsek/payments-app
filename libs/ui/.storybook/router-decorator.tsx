import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { getRouter } from '@storybook/nextjs/navigation.mock';
import type { NextRouter } from 'next/router';

const RouterDecorator = (Story) => (
  <RouterContext.Provider value={getRouter() as unknown as NextRouter}>
    {Story()}
  </RouterContext.Provider>
);

export default RouterDecorator;
