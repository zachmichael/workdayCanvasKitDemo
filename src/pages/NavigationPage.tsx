import * as React from 'react';
import {Tabs} from '@workday/canvas-kit-react/tabs';
import {Breadcrumbs} from '@workday/canvas-kit-react/breadcrumbs';
import {Menu} from '@workday/canvas-kit-react/menu';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {Text} from '@workday/canvas-kit-react/text';
import {Flex} from '@workday/canvas-kit-react/layout';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';
import {
  listViewIcon,
  gridIcon,
  relatedActionsVerticalIcon,
  editIcon,
  exportIcon,
  trashIcon,
} from '@workday/canvas-system-icons-web';

import {iconOnly} from '../components/IconButton';
import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';

const panelStyles = createStyles({
  padding: system.space.x4,
  width: '100%',
});

/**
 * Tabs.Item defaults its id to the tab's text while Tabs.Panel defaults to the
 * panel's index, so the two never match on their own — always pair them with an
 * explicit `data-id`.
 */
const TabsExample = () => (
  <Tabs initialTab="summary">
    <Tabs.List>
      <Tabs.Item data-id="summary">Summary</Tabs.Item>
      <Tabs.Item data-id="compensation">Compensation</Tabs.Item>
      <Tabs.Item data-id="time-off">Time off</Tabs.Item>
      <Tabs.Item data-id="documents">Documents</Tabs.Item>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel data-id="summary" className={panelStyles}>
        <Text typeLevel="body.medium">
          Tabs manage their own selection state through a model. Pass initialTab to select one on
          mount, or hoist the model with useTabsModel to control it yourself.
        </Text>
      </Tabs.Panel>
      <Tabs.Panel data-id="compensation" className={panelStyles}>
        <Text typeLevel="body.medium">Compensation history and pay groups live here.</Text>
      </Tabs.Panel>
      <Tabs.Panel data-id="time-off" className={panelStyles}>
        <Text typeLevel="body.medium">Balances, accruals and pending requests.</Text>
      </Tabs.Panel>
      <Tabs.Panel data-id="documents" className={panelStyles}>
        <Text typeLevel="body.medium">Contracts, reviews and signed policies.</Text>
      </Tabs.Panel>
    </Tabs.Panels>
  </Tabs>
);

const MenuExample = () => (
  <Menu>
    <Menu.Target
      as={SecondaryButton}
      icon={relatedActionsVerticalIcon}
      iconPosition={iconOnly}
      aria-label="Row actions"
    />
    <Menu.Popper>
      <Menu.Card>
        <Menu.List>
          <Menu.Item data-id="edit">
            <Menu.Item.Icon icon={editIcon} />
            <Menu.Item.Text>Edit worker</Menu.Item.Text>
          </Menu.Item>
          <Menu.Item data-id="export">
            <Menu.Item.Icon icon={exportIcon} />
            <Menu.Item.Text>Export record</Menu.Item.Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item data-id="delete">
            <Menu.Item.Icon icon={trashIcon} />
            <Menu.Item.Text>Delete</Menu.Item.Text>
          </Menu.Item>
        </Menu.List>
      </Menu.Card>
    </Menu.Popper>
  </Menu>
);

const SegmentedControlExample = () => {
  const [view, setView] = React.useState('list');

  return (
    <Flex flexDirection="column" gap="x2" alignItems="flex-start">
      <SegmentedControl initialValue={view} onSelect={({id}) => setView(id)}>
        <SegmentedControl.List aria-label="Choose a view">
          <SegmentedControl.Item data-id="list" icon={listViewIcon} aria-label="List view" />
          <SegmentedControl.Item data-id="grid" icon={gridIcon} aria-label="Grid view" />
        </SegmentedControl.List>
      </SegmentedControl>
      <Text typeLevel="subtext.large" variant="hint">
        Current view: {view}
      </Text>
    </Flex>
  );
};

export const NavigationPage = () => (
  <>
    <PageHeader
      title="Navigation"
      intro="Tabs switch between peer views of the same object. Breadcrumbs show where you are in a hierarchy. Menus hold actions, not navigation."
    />

    <DemoSection
      title="Tabs"
      description="Pair each Tabs.Item with a Tabs.Panel of the same data-id. Overflowing tabs collapse into a menu automatically when the container narrows."
      stack={true}
      code={`<Tabs initialTab="summary">
  <Tabs.List>
    <Tabs.Item data-id="summary">Summary</Tabs.Item>
    <Tabs.Item data-id="compensation">Compensation</Tabs.Item>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel data-id="summary">…</Tabs.Panel>
    <Tabs.Panel data-id="compensation">…</Tabs.Panel>
  </Tabs.Panels>
</Tabs>`}
    >
      <TabsExample />
    </DemoSection>

    <DemoSection
      title="Breadcrumbs"
      description="The last crumb is the current page and is not a link."
      stack={true}
      code={`<Breadcrumbs aria-label="Breadcrumbs">
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Organisation</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.CurrentItem>Amara Okafor</Breadcrumbs.CurrentItem>
  </Breadcrumbs.List>
</Breadcrumbs>`}
    >
      <Breadcrumbs aria-label="Breadcrumbs">
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Organisation</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Design Systems</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.CurrentItem>Amara Okafor</Breadcrumbs.CurrentItem>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </DemoSection>

    <DemoSection
      title="Menu"
      description="Menus are for actions on the current object. Give each item a data-id so selection handlers can identify it."
      code={`<Menu>
  <Menu.Target as={SecondaryButton} icon={relatedActionsVerticalIcon} iconPosition="only" aria-label="Row actions" />
  <Menu.Popper>
    <Menu.Card>
      <Menu.List>
        <Menu.Item data-id="edit">
          <Menu.Item.Icon icon={editIcon} />
          <Menu.Item.Text>Edit worker</Menu.Item.Text>
        </Menu.Item>
      </Menu.List>
    </Menu.Card>
  </Menu.Popper>
</Menu>`}
    >
      <MenuExample />
    </DemoSection>

    <DemoSection
      title="Segmented control"
      description="A small set of mutually exclusive view options. Icon-only items still need an aria-label."
      stack={true}
      code={`<SegmentedControl initialValue="list" onSelect={({id}) => setView(id)}>
  <SegmentedControl.List aria-label="Choose a view">
    <SegmentedControl.Item data-id="list" icon={listViewIcon} aria-label="List view" />
    <SegmentedControl.Item data-id="grid" icon={gridIcon} aria-label="Grid view" />
  </SegmentedControl.List>
</SegmentedControl>`}
    >
      <SegmentedControlExample />
    </DemoSection>
  </>
);
