import * as React from 'react';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {TextArea} from '@workday/canvas-kit-react/text-area';
import {Select} from '@workday/canvas-kit-react/select';
import {Checkbox} from '@workday/canvas-kit-react/checkbox';
import {RadioGroup, Radio} from '@workday/canvas-kit-react/radio';
import {Switch} from '@workday/canvas-kit-react/switch';
import {Flex} from '@workday/canvas-kit-react/layout';
import {Banner} from '@workday/canvas-kit-react/banner';
import {PrimaryButton, SecondaryButton} from '@workday/canvas-kit-react/button';

import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';
import {teams} from '../data/employees';

const leaveTypes = ['Paid time off', 'Sick leave', 'Parental leave', 'Unpaid leave'];

/** A small real form, so the field components are shown doing actual work. */
const TimeOffForm = () => {
  const [name, setName] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const nameError = touched && name.trim() === '' ? ('error' as const) : undefined;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (name.trim() !== '') {
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: 480}}>
      <Flex flexDirection="column" gap="x4">
        {submitted && (
          <Banner>
            <Banner.Icon />
            <Banner.Label>Request submitted for {name}.</Banner.Label>
          </Banner>
        )}

        <FormField error={nameError} isRequired={true}>
          <FormField.Label>Worker name</FormField.Label>
          <FormField.Field>
            <FormField.Input
              as={TextInput}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            <FormField.Hint>
              {nameError ? 'Enter the worker this request is for.' : 'As it appears in Workday.'}
            </FormField.Hint>
          </FormField.Field>
        </FormField>

        <Select items={leaveTypes}>
          <FormField>
            <FormField.Label>Leave type</FormField.Label>
            <FormField.Field>
              <Select.Input />
              <Select.Popper>
                <Select.Card>
                  <Select.List>{item => <Select.Item>{item}</Select.Item>}</Select.List>
                </Select.Card>
              </Select.Popper>
            </FormField.Field>
          </FormField>
        </Select>

        <FormField>
          <FormField.Label>Reason</FormField.Label>
          <FormField.Field>
            <FormField.Input
              as={TextArea}
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
            />
            <FormField.Hint>Optional. Visible to your manager only.</FormField.Hint>
          </FormField.Field>
        </FormField>

        <Flex gap="x2">
          <PrimaryButton type="submit">Submit request</PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => {
              setName('');
              setReason('');
              setTouched(false);
              setSubmitted(false);
            }}
          >
            Reset
          </SecondaryButton>
        </Flex>
      </Flex>
    </form>
  );
};

const CheckboxGroup = () => {
  const [checked, setChecked] = React.useState({email: true, push: false, digest: true});

  return (
    <Flex flexDirection="column" gap="x2">
      <Checkbox
        label="Email notifications"
        checked={checked.email}
        onChange={e => setChecked({...checked, email: e.target.checked})}
      />
      <Checkbox
        label="Push notifications"
        checked={checked.push}
        onChange={e => setChecked({...checked, push: e.target.checked})}
      />
      <Checkbox
        label="Weekly digest"
        checked={checked.digest}
        onChange={e => setChecked({...checked, digest: e.target.checked})}
      />
      <Checkbox label="Disabled option" disabled={true} />
    </Flex>
  );
};

const TeamRadioGroup = () => {
  const [value, setValue] = React.useState<string | number>(teams[0]);

  return (
    <RadioGroup name="team" value={value} onChange={setValue}>
      {teams.map(team => (
        <Radio key={team} value={team} label={team} />
      ))}
    </RadioGroup>
  );
};

const SwitchExample = () => {
  const [on, setOn] = React.useState(true);

  return (
    <FormField orientation="horizontalStart">
      <FormField.Label>Delegate approvals</FormField.Label>
      <FormField.Field>
        <FormField.Input as={Switch} checked={on} onChange={() => setOn(v => !v)} />
      </FormField.Field>
    </FormField>
  );
};

export const FormsPage = () => (
  <>
    <PageHeader
      title="Forms & Inputs"
      intro="FormField is the wrapper that ties a label, input and hint together and propagates error state and required markers down to whatever input you pass it."
    />

    <DemoSection
      title="A working form"
      description="Submit it empty to see the required-field error state propagate from FormField to the input and hint."
      stack={true}
      code={`<FormField error={nameError} isRequired>
  <FormField.Label>Worker name</FormField.Label>
  <FormField.Field>
    <FormField.Input as={TextInput} value={name} onChange={handleChange} />
    <FormField.Hint>As it appears in Workday.</FormField.Hint>
  </FormField.Field>
</FormField>`}
    >
      <TimeOffForm />
    </DemoSection>

    <DemoSection
      title="Field states"
      description="Error and caution are the two built-in variants; both colour the border and the hint text."
      stack={true}
      code={`<FormField error="error">…</FormField>
<FormField error="caution">…</FormField>`}
    >
      <Flex gap="x6" flexWrap="wrap">
        <FormField>
          <FormField.Label>Default</FormField.Label>
          <FormField.Field>
            <FormField.Input as={TextInput} defaultValue="Looks good" />
            <FormField.Hint>Helper text sits below the input.</FormField.Hint>
          </FormField.Field>
        </FormField>

        <FormField error="caution">
          <FormField.Label>Caution</FormField.Label>
          <FormField.Field>
            <FormField.Input as={TextInput} defaultValue="0 hours" />
            <FormField.Hint>This will use next year&rsquo;s balance.</FormField.Hint>
          </FormField.Field>
        </FormField>

        <FormField error="error">
          <FormField.Label>Error</FormField.Label>
          <FormField.Field>
            <FormField.Input as={TextInput} defaultValue="-4" />
            <FormField.Hint>Hours must be a positive number.</FormField.Hint>
          </FormField.Field>
        </FormField>

        <FormField>
          <FormField.Label>Disabled</FormField.Label>
          <FormField.Field>
            <FormField.Input as={TextInput} defaultValue="Read only" disabled={true} />
          </FormField.Field>
        </FormField>
      </Flex>
    </DemoSection>

    <DemoSection
      title="Checkboxes"
      description="Checkbox takes its label directly rather than through FormField.Label."
      stack={true}
      code={`<Checkbox label="Email notifications" checked={checked} onChange={handleChange} />`}
    >
      <CheckboxGroup />
    </DemoSection>

    <DemoSection
      title="Radio group"
      description="RadioGroup owns the value; the individual Radios stay uncontrolled."
      stack={true}
      code={`<RadioGroup name="team" value={value} onChange={setValue}>
  <Radio value="Platform" label="Platform" />
  <Radio value="Payroll" label="Payroll" />
</RadioGroup>`}
    >
      <TeamRadioGroup />
    </DemoSection>

    <DemoSection
      title="Switch"
      description="Use a switch for a setting that takes effect immediately; use a checkbox inside a form you submit."
      stack={true}
      code={`<FormField orientation="horizontalStart">
  <FormField.Label>Delegate approvals</FormField.Label>
  <FormField.Field>
    <FormField.Input as={Switch} checked={on} onChange={toggle} />
  </FormField.Field>
</FormField>`}
    >
      <SwitchExample />
    </DemoSection>
  </>
);
