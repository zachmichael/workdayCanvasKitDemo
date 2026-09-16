import * as React from 'react';
import {Table} from '@workday/canvas-kit-react/table';
import {Avatar} from '@workday/canvas-kit-react/avatar';
import {Pagination} from '@workday/canvas-kit-react/pagination';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {Flex} from '@workday/canvas-kit-react/layout';
import {Text} from '@workday/canvas-kit-react/text';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';
import {caretDownIcon, caretUpIcon} from '@workday/canvas-system-icons-web';

import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';
import {StatusPill} from '../components/StatusPill';
import {employees, Employee} from '../data/employees';

const PAGE_SIZE = 5;

const fullWidth = createStyles({width: '100%'});

const nameCellStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  gap: system.space.x3,
});

type SortKey = 'name' | 'title' | 'team' | 'location';

const EmployeeTable = () => {
  const [query, setQuery] = React.useState('');
  const [sortKey, setSortKey] = React.useState<SortKey>('name');
  const [ascending, setAscending] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? employees.filter(e =>
          [e.name, e.title, e.team, e.location].some(v => v.toLowerCase().includes(q))
        )
      : employees;

    return [...matches].sort((a, b) => {
      const result = a[sortKey].localeCompare(b[sortKey]);
      return ascending ? result : -result;
    });
  }, [query, sortKey, ascending]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, lastPage);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending(v => !v);
    } else {
      setSortKey(key);
      setAscending(true);
    }
    setPage(1);
  };

  const sortableHeader = (key: SortKey, label: string) => (
    <Table.Header scope="col" aria-sort={sortKey === key ? (ascending ? 'ascending' : 'descending') : 'none'}>
      <TertiaryButton
        size="small"
        icon={sortKey === key && !ascending ? caretUpIcon : caretDownIcon}
        iconPosition="end"
        onClick={() => toggleSort(key)}
      >
        {label}
      </TertiaryButton>
    </Table.Header>
  );

  return (
    <Flex flexDirection="column" gap="x4" className={fullWidth}>
      <FormField>
        <FormField.Label>Search workers</FormField.Label>
        <FormField.Field>
          <FormField.Input
            as={TextInput}
            value={query}
            placeholder="Name, title, team or location"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </FormField.Field>
      </FormField>

      <Table>
        <Table.Caption>
          {filtered.length} worker{filtered.length === 1 ? '' : 's'} matching the current filter
        </Table.Caption>
        <Table.Head>
          <Table.Row>
            {sortableHeader('name', 'Worker')}
            {sortableHeader('title', 'Job title')}
            {sortableHeader('team', 'Team')}
            {sortableHeader('location', 'Location')}
            <Table.Header scope="col">Status</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((employee: Employee) => (
            <Table.Row key={employee.id}>
              <Table.Cell>
                <span className={nameCellStyles}>
                  <Avatar name={employee.name} size="small" isDecorative={true} />
                  {employee.name}
                </span>
              </Table.Cell>
              <Table.Cell>{employee.title}</Table.Cell>
              <Table.Cell>{employee.team}</Table.Cell>
              <Table.Cell>{employee.location}</Table.Cell>
              <Table.Cell>
                <StatusPill tone={employee.tone}>{employee.status}</StatusPill>
              </Table.Cell>
            </Table.Row>
          ))}
          {rows.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={5}>
                <Text variant="hint">No workers match &ldquo;{query}&rdquo;.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Pagination
        aria-label="Worker list pagination"
        lastPage={lastPage}
        // Remounting on lastPage change keeps the uncontrolled Pagination model
        // in sync when filtering shrinks the result set.
        key={lastPage}
        initialCurrentPage={currentPage}
        onPageChange={setPage}
      >
        <Pagination.Controls>
          <Pagination.JumpToFirstButton aria-label="First page" />
          <Pagination.StepToPreviousButton aria-label="Previous page" />
          <Pagination.PageList>
            {({state}) =>
              state.range.map(pageNumber => (
                <Pagination.PageListItem key={pageNumber}>
                  <Pagination.PageButton
                    aria-label={`Page ${pageNumber}`}
                    pageNumber={pageNumber}
                  />
                </Pagination.PageListItem>
              ))
            }
          </Pagination.PageList>
          <Pagination.StepToNextButton aria-label="Next page" />
          <Pagination.JumpToLastButton aria-label="Last page" />
        </Pagination.Controls>
        <Pagination.AdditionalDetails>
          {({state}) =>
            `Showing ${Math.min((state.currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–${Math.min(
              state.currentPage * PAGE_SIZE,
              filtered.length
            )} of ${filtered.length} workers`
          }
        </Pagination.AdditionalDetails>
      </Pagination>
    </Flex>
  );
};

export const DataPage = () => (
  <>
    <PageHeader
      title="Data Display"
      intro="Table, Avatar and Pagination composed into the pattern you actually ship: a filterable, sortable, paged list."
    />

    <DemoSection
      title="Worker directory"
      description="Search filters across every column, the column headers sort, and Pagination drives the page window."
      stack={true}
      code={`<Table>
  <Table.Caption>…</Table.Caption>
  <Table.Head>
    <Table.Row>
      <Table.Header scope="col">Worker</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Avatar name={employee.name} size="small" isDecorative />
        {employee.name}
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
    >
      <EmployeeTable />
    </DemoSection>

    <DemoSection
      title="Avatar sizes"
      description="Avatar falls back to initials when no image URL is supplied."
      code={`<Avatar name="Amara Okafor" size="extraSmall" />
<Avatar name="Amara Okafor" size="small" />
<Avatar name="Amara Okafor" size="medium" />
<Avatar name="Amara Okafor" size="large" />`}
    >
      <Avatar name="Amara Okafor" size="extraSmall" isDecorative={true} />
      <Avatar name="Amara Okafor" size="small" isDecorative={true} />
      <Avatar name="Amara Okafor" size="medium" isDecorative={true} />
      <Avatar name="Amara Okafor" size="large" isDecorative={true} />
      <Avatar name="Amara Okafor" size="extraLarge" isDecorative={true} />
    </DemoSection>

    <DemoSection
      title="Status pills"
      description="StatusIndicator is deprecated in v16, so this chip is a local component built with createStencil and system tokens."
      code={`const statusPillStencil = createStencil({
  base: {borderRadius: system.shape.round, /* … */},
  modifiers: {
    tone: {
      positive: {backgroundColor: system.color.bg.positive.softer},
      critical: {backgroundColor: system.color.bg.critical.softer},
    },
  },
});`}
    >
      <StatusPill tone="positive">Active</StatusPill>
      <StatusPill tone="caution">On leave</StatusPill>
      <StatusPill tone="critical">Contract ended</StatusPill>
      <StatusPill tone="muted">Onboarding</StatusPill>
    </DemoSection>
  </>
);
