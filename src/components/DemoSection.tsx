import * as React from 'react';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';
import {Flex} from '@workday/canvas-kit-react/layout';
import {Text} from '@workday/canvas-kit-react/text';
import {TertiaryButton} from '@workday/canvas-kit-react/button';

const sectionStyles = createStyles({
  backgroundColor: system.color.surface.default,
  border: `1px solid ${system.color.border.container}`,
  borderRadius: system.shape.x2,
  marginBlockEnd: system.space.x6,
  overflow: 'hidden',
});

const headerStyles = createStyles({
  padding: `${system.space.x4} ${system.space.x6}`,
  borderBlockEnd: `1px solid ${system.color.border.divider}`,
});

const previewStyles = createStyles({
  padding: system.space.x6,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: system.space.x4,
});

const footerStyles = createStyles({
  borderBlockStart: `1px solid ${system.color.border.divider}`,
  paddingInline: system.space.x4,
  paddingBlock: system.space.x2,
});

const codeStyles = createStyles({
  margin: 0,
  padding: system.space.x6,
  backgroundColor: system.color.bg.alt.soft,
  borderBlockStart: `1px solid ${system.color.border.divider}`,
  fontFamily: system.fontFamily.mono,
  fontSize: system.fontSize.body.small,
  lineHeight: system.lineHeight.body.large,
  color: system.color.text.strong,
  overflowX: 'auto',
});

export interface DemoSectionProps {
  title: string;
  description?: string;
  /** Source snippet shown when the viewer expands "Show code". */
  code?: string;
  /** Renders the preview area as a column instead of a wrapping row. */
  stack?: boolean;
  children: React.ReactNode;
}

/**
 * Wraps a single live example: a heading, the rendered component, and the
 * source that produced it. Every page is built out of these.
 */
export const DemoSection = ({title, description, code, stack, children}: DemoSectionProps) => {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <section className={sectionStyles}>
      <div className={headerStyles}>
        <Text as="h2" typeLevel="heading.small" margin="zero">
          {title}
        </Text>
        {description && (
          <Text as="p" typeLevel="body.small" variant="hint" margin="zero" marginTop="x1">
            {description}
          </Text>
        )}
      </div>

      <Flex
        className={previewStyles}
        flexDirection={stack ? 'column' : 'row'}
        alignItems={stack ? 'flex-start' : 'center'}
      >
        {children}
      </Flex>

      {code && (
        <>
          <div className={footerStyles}>
            <TertiaryButton size="small" onClick={() => setShowCode(v => !v)}>
              {showCode ? 'Hide code' : 'Show code'}
            </TertiaryButton>
          </div>
          {showCode && <pre className={codeStyles}>{code.trim()}</pre>}
        </>
      )}
    </section>
  );
};
