import {system} from '@workday/canvas-tokens-web';
import {createStyles} from '@workday/canvas-kit-styling';
import {Text} from '@workday/canvas-kit-react/text';

const headerStyles = createStyles({
  marginBlockEnd: system.space.x8,
});

export const PageHeader = ({title, intro}: {title: string; intro: string}) => (
  <header className={headerStyles}>
    <Text as="h1" typeLevel="title.small" margin="zero">
      {title}
    </Text>
    <Text as="p" typeLevel="body.medium" variant="hint" marginTop="x2" marginBottom="zero">
      {intro}
    </Text>
  </header>
);
