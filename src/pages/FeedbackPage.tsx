import * as React from 'react';
import {Banner} from '@workday/canvas-kit-react/banner';
import {Toast} from '@workday/canvas-kit-react/toast';
import {Modal} from '@workday/canvas-kit-react/modal';
import {Dialog} from '@workday/canvas-kit-react/dialog';
import {Popup, useCloseOnEscape, usePopupModel, useInitialFocus} from '@workday/canvas-kit-react/popup';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {LoadingDots} from '@workday/canvas-kit-react/loading-dots';
import {Skeleton} from '@workday/canvas-kit-react/skeleton';
import {Flex} from '@workday/canvas-kit-react/layout';
import {PrimaryButton, SecondaryButton, DeleteButton} from '@workday/canvas-kit-react/button';
import {checkIcon, infoIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';
import {createStyles, cssVar} from '@workday/canvas-kit-styling';

import {TertiaryIconButton} from '../components/IconButton';
import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';

const panelStyles = createStyles({
  width: '100%',
  maxWidth: '520px',
  padding: system.space.x4,
  border: `1px solid ${system.color.border.container}`,
  borderRadius: system.shape.x2,
});

const ToastExample = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Flex flexDirection="column" gap="x4" alignItems="flex-start">
      {visible ? (
        <Toast mode="dialog" aria-label="Notification">
          <Toast.Icon icon={checkIcon} color={system.color.fg.positive.default} />
          <Toast.Body>
            <Toast.Message>Your time-off request was submitted.</Toast.Message>
            <Toast.Link href="#">View request</Toast.Link>
          </Toast.Body>
          <Toast.CloseIcon aria-label="Close" onClick={() => setVisible(false)} />
        </Toast>
      ) : (
        <SecondaryButton onClick={() => setVisible(true)}>Show the toast again</SecondaryButton>
      )}
    </Flex>
  );
};

const ModalExample = () => (
  <Modal>
    <Modal.Target as={DeleteButton}>Delete request</Modal.Target>
    <Modal.Overlay>
      <Modal.Card>
        <Modal.CloseIcon aria-label="Close" />
        <Modal.Heading>Delete time-off request?</Modal.Heading>
        <Modal.Body>
          This permanently removes the request from the approval queue. Your manager will not be
          notified.
        </Modal.Body>
        <Modal.ButtonGroup>
          <Modal.CloseButton as={DeleteButton}>Delete</Modal.CloseButton>
          <Modal.CloseButton>Cancel</Modal.CloseButton>
        </Modal.ButtonGroup>
      </Modal.Card>
    </Modal.Overlay>
  </Modal>
);

const DialogExample = () => (
  <Dialog>
    <Dialog.Target as={SecondaryButton}>Show dialog</Dialog.Target>
    <Dialog.Popper>
      <Dialog.Card>
        <Dialog.CloseIcon aria-label="Close" />
        <Dialog.Heading>Approval routing</Dialog.Heading>
        <Dialog.Body>
          Requests over 10 days route to your manager&rsquo;s manager. A dialog is non-modal, so the
          page behind it stays interactive.
        </Dialog.Body>
      </Dialog.Card>
    </Dialog.Popper>
  </Dialog>
);

const PopupExample = () => {
  const model = usePopupModel();

  useCloseOnEscape(model);
  useInitialFocus(model);

  return (
    <Popup model={model}>
      <Popup.Target as={SecondaryButton}>Show popup</Popup.Target>
      <Popup.Popper placement="bottom-start">
        <Popup.Card>
          <Popup.CloseIcon aria-label="Close" />
          <Popup.Heading>Balance details</Popup.Heading>
          <Popup.Body>You have 14 days of paid time off remaining this year.</Popup.Body>
          <Popup.ButtonGroup>
            <Popup.CloseButton as={PrimaryButton}>Got it</Popup.CloseButton>
          </Popup.ButtonGroup>
        </Popup.Card>
      </Popup.Popper>
    </Popup>
  );
};

export const FeedbackPage = () => (
  <>
    <PageHeader
      title="Feedback"
      intro="Everything that tells the user what just happened, or is about to: inline banners, transient toasts, blocking modals, non-modal dialogs and loading states."
    />

    <DemoSection
      title="Banner"
      description="Persistent, inline, tied to the content it describes. hasError switches it to the critical treatment."
      stack={true}
      code={`<Banner>
  <Banner.Icon />
  <Banner.Label>3 items require your attention</Banner.Label>
  <Banner.ActionText />
</Banner>

<Banner hasError>…</Banner>`}
    >
      <Banner>
        <Banner.Icon />
        <Banner.Label>3 approvals require your attention</Banner.Label>
        <Banner.ActionText />
      </Banner>
      <Banner hasError={true}>
        <Banner.Icon />
        <Banner.Label>Payroll sync failed for 2 workers</Banner.Label>
        <Banner.ActionText />
      </Banner>
      <Banner isSticky={true}>
        <Banner.Icon />
        <Banner.Label>Sticky banner — anchors to the viewport edge</Banner.Label>
      </Banner>
    </DemoSection>

    <DemoSection
      title="Toast"
      description="Transient confirmation. Shown here inline; in a real app you'd render it in a Popup positioned at a screen corner."
      stack={true}
      code={`<Toast mode="dialog" aria-label="Notification">
  <Toast.Icon icon={checkIcon} color={system.color.fg.positive.default} />
  <Toast.Body>
    <Toast.Message>Your time-off request was submitted.</Toast.Message>
    <Toast.Link href="#">View request</Toast.Link>
  </Toast.Body>
  <Toast.CloseIcon aria-label="Close" onClick={handleClose} />
</Toast>`}
    >
      <ToastExample />
    </DemoSection>

    <DemoSection
      title="Modal, Dialog and Popup"
      description="Modal traps focus and blocks the page. Dialog and Popup are non-modal — the difference is that Popup gives you the model so you control focus and dismissal."
      code={`<Modal>
  <Modal.Target as={DeleteButton}>Delete request</Modal.Target>
  <Modal.Overlay>
    <Modal.Card>
      <Modal.CloseIcon aria-label="Close" />
      <Modal.Heading>Delete time-off request?</Modal.Heading>
      <Modal.Body>…</Modal.Body>
      <Modal.ButtonGroup>
        <Modal.CloseButton as={DeleteButton}>Delete</Modal.CloseButton>
        <Modal.CloseButton>Cancel</Modal.CloseButton>
      </Modal.ButtonGroup>
    </Modal.Card>
  </Modal.Overlay>
</Modal>`}
    >
      <ModalExample />
      <DialogExample />
      <PopupExample />
    </DemoSection>

    <DemoSection
      title="Tooltip"
      description="Wraps a single focusable child. Use type='muted' for descriptive text, and the default for name labels on icon-only controls."
      code={`<Tooltip title="Requests route to your manager">
  <TertiaryButton icon={infoIcon} iconPosition="only" aria-label="About approvals" />
</Tooltip>`}
    >
      <Tooltip title="Requests route to your manager">
        <TertiaryIconButton icon={infoIcon} aria-label="About approvals" />
      </Tooltip>
      <Tooltip title="This describes the button, it does not name it" type="muted">
        <SecondaryButton>Hover or focus me</SecondaryButton>
      </Tooltip>
    </DemoSection>

    <DemoSection
      title="Loading states"
      description="LoadingDots for short in-place waits; Skeleton for content whose shape you already know."
      stack={true}
      code={`<LoadingDots />

<Skeleton>
  <Skeleton.Header />
  <Skeleton.Text lineCount={3} />
</Skeleton>`}
    >
      <LoadingDots />
      <div className={panelStyles}>
        <Skeleton>
          <Skeleton.Shape width={48} height={48} borderRadius={cssVar(system.shape.round)} />
          <Skeleton.Header />
          <Skeleton.Text lineCount={3} />
        </Skeleton>
      </div>
    </DemoSection>
  </>
);
