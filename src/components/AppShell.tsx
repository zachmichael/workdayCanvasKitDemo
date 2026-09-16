import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {createStyles, cssVar} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';
import {Text} from '@workday/canvas-kit-react/text';
import {ExternalHyperlink} from '@workday/canvas-kit-react/button';

const layoutStyles = createStyles({
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  minHeight: '100vh',
  '@media (max-width: 800px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

const sidebarStyles = createStyles({
  backgroundColor: system.color.surface.default,
  borderInlineEnd: `1px solid ${system.color.border.container}`,
  padding: system.space.x6,
  position: 'sticky',
  top: 0,
  alignSelf: 'start',
  maxHeight: '100vh',
  overflowY: 'auto',
  '@media (max-width: 800px)': {
    position: 'static',
    maxHeight: 'none',
  },
});

const brandStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  gap: system.space.x3,
  marginBlockEnd: system.space.x6,
});

const markStyles = createStyles({
  width: system.space.x10,
  height: system.space.x10,
  borderRadius: system.shape.x2,
  backgroundColor: system.color.bg.primary.default,
  color: system.color.static.white,
  display: 'grid',
  placeItems: 'center',
  fontWeight: system.fontWeight.bold,
  flexShrink: 0,
});

const navListStyles = createStyles({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: system.space.x1,
});

const navLinkStyles = createStyles({
  display: 'block',
  padding: `${cssVar(system.space.x2)} ${cssVar(system.space.x3)}`,
  borderRadius: system.shape.x1,
  color: system.color.text.default,
  textDecoration: 'none',
  fontSize: system.fontSize.body.small,
  '&:hover': {
    backgroundColor: system.color.bg.alt.soft,
  },
  '&.active': {
    backgroundColor: system.color.bg.primary.default,
    color: system.color.static.white,
    fontWeight: system.fontWeight.medium,
  },
});

const mainStyles = createStyles({
  padding: system.space.x10,
  maxWidth: '1100px',
  width: '100%',
  '@media (max-width: 800px)': {
    padding: system.space.x4,
  },
});

const footerStyles = createStyles({
  marginBlockStart: system.space.x10,
  paddingBlockStart: system.space.x4,
  borderBlockStart: `1px solid ${system.color.border.divider}`,
});

export const navItems = [
  {to: '/buttons', label: 'Buttons'},
  {to: '/forms', label: 'Forms & Inputs'},
  {to: '/data', label: 'Data Display'},
  {to: '/feedback', label: 'Feedback'},
  {to: '/navigation', label: 'Navigation'},
  {to: '/tokens', label: 'Design Tokens'},
];

export const AppShell = ({children}: {children: React.ReactNode}) => (
  <div className={layoutStyles}>
    <aside className={sidebarStyles}>
      <div className={brandStyles}>
        <div className={markStyles} aria-hidden="true">
          CK
        </div>
        <div>
          <Text as="div" typeLevel="body.medium" fontWeight="bold">
            Canvas Kit
          </Text>
          <Text as="div" typeLevel="subtext.medium" variant="hint">
            Component showcase
          </Text>
        </div>
      </div>

      <nav aria-label="Showcase sections">
        <ul className={navListStyles}>
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={navLinkStyles}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={footerStyles}>
        <Text as="p" typeLevel="subtext.medium" variant="hint" margin="zero">
          Built with{' '}
          <ExternalHyperlink href="https://workday.github.io/canvas-kit/">
            Canvas Kit v16
          </ExternalHyperlink>
        </Text>
      </div>
    </aside>

    <main className={mainStyles}>{children}</main>
  </div>
);
