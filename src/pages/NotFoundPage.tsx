import {Link} from 'react-router-dom';
import {Banner} from '@workday/canvas-kit-react/banner';
import {Flex} from '@workday/canvas-kit-react/layout';

import {PageHeader} from '../components/PageHeader';

export const NotFoundPage = () => (
  <>
    <PageHeader title="Page not found" intro="That route isn't part of the showcase." />
    <Flex flexDirection="column" alignItems="flex-start" gap="x4">
      <Banner hasError={true}>
        <Banner.Icon />
        <Banner.Label>No such page</Banner.Label>
      </Banner>
      <Link to="/buttons">Back to Buttons</Link>
    </Flex>
  </>
);
