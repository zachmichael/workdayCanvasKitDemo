import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  DeleteButton,
  Hyperlink,
  ExternalHyperlink,
} from '@workday/canvas-kit-react/button';
import {plusIcon, uploadCloudIcon, trashIcon, arrowRightIcon} from '@workday/canvas-system-icons-web';

import {SecondaryIconButton} from '../components/IconButton';
import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';

export const ButtonsPage = () => (
  <>
    <PageHeader
      title="Buttons"
      intro="Canvas ships four button intents. Pick by emphasis, not by colour: one primary action per view, secondary for supporting actions, tertiary for low-emphasis, delete for destructive."
    />

    <DemoSection
      title="Intents"
      description="Primary, Secondary, Tertiary and Delete. Each accepts the same props."
      code={`<PrimaryButton>Submit</PrimaryButton>
<SecondaryButton>Save draft</SecondaryButton>
<TertiaryButton>Cancel</TertiaryButton>
<DeleteButton>Delete</DeleteButton>`}
    >
      <PrimaryButton>Submit</PrimaryButton>
      <SecondaryButton>Save draft</SecondaryButton>
      <TertiaryButton>Cancel</TertiaryButton>
      <DeleteButton>Delete</DeleteButton>
    </DemoSection>

    <DemoSection
      title="Sizes"
      description="extraSmall, small, medium (default) and large."
      code={`<PrimaryButton size="extraSmall">Extra small</PrimaryButton>
<PrimaryButton size="small">Small</PrimaryButton>
<PrimaryButton size="medium">Medium</PrimaryButton>
<PrimaryButton size="large">Large</PrimaryButton>`}
    >
      <PrimaryButton size="extraSmall">Extra small</PrimaryButton>
      <PrimaryButton size="small">Small</PrimaryButton>
      <PrimaryButton size="medium">Medium</PrimaryButton>
      <PrimaryButton size="large">Large</PrimaryButton>
    </DemoSection>

    <DemoSection
      title="With icons"
      description="iconPosition moves the icon; only renders an icon-only button, which still needs an accessible name."
      code={`<PrimaryButton icon={plusIcon}>Add worker</PrimaryButton>
<SecondaryButton icon={arrowRightIcon} iconPosition="end">Continue</SecondaryButton>
<SecondaryButton icon={uploadCloudIcon} iconPosition="only" aria-label="Upload" />
<DeleteButton icon={trashIcon}>Delete request</DeleteButton>`}
    >
      <PrimaryButton icon={plusIcon}>Add worker</PrimaryButton>
      <SecondaryButton icon={arrowRightIcon} iconPosition="end">
        Continue
      </SecondaryButton>
      <SecondaryIconButton icon={uploadCloudIcon} aria-label="Upload" />
      <DeleteButton icon={trashIcon}>Delete request</DeleteButton>
    </DemoSection>

    <DemoSection
      title="Disabled state"
      description="Disabled buttons keep their layout but stop receiving pointer and keyboard events."
      code={`<PrimaryButton disabled>Submit</PrimaryButton>
<SecondaryButton disabled>Save draft</SecondaryButton>`}
    >
      <PrimaryButton disabled>Submit</PrimaryButton>
      <SecondaryButton disabled>Save draft</SecondaryButton>
      <TertiaryButton disabled>Cancel</TertiaryButton>
      <DeleteButton disabled>Delete</DeleteButton>
    </DemoSection>

    <DemoSection
      title="Full width"
      description="grow stretches a button to fill its container — useful in narrow side panels and mobile layouts."
      stack={true}
      code={`<PrimaryButton grow>Request time off</PrimaryButton>`}
    >
      <div style={{width: '100%', maxWidth: 420}}>
        <PrimaryButton grow>Request time off</PrimaryButton>
      </div>
    </DemoSection>

    <DemoSection
      title="Hyperlinks"
      description="For navigation, use a link — not a button. ExternalHyperlink appends an icon and opens in a new tab."
      code={`<Hyperlink href="#">View the org chart</Hyperlink>
<ExternalHyperlink href="https://workday.github.io/canvas-kit/">
  Canvas Kit docs
</ExternalHyperlink>`}
    >
      <Hyperlink href="#">View the org chart</Hyperlink>
      <ExternalHyperlink href="https://workday.github.io/canvas-kit/">
        Canvas Kit docs
      </ExternalHyperlink>
    </DemoSection>
  </>
);
