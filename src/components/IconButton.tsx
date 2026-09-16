import {SecondaryButton, TertiaryButton} from '@workday/canvas-kit-react/button';
import type {CanvasSystemIcon} from '@workday/design-assets-types';

/**
 * Canvas Kit's button stencils support an `iconPosition` of `only` (square,
 * zero-padding icon buttons), but `SecondaryButton`/`TertiaryButton` type the
 * prop as `'start' | 'end'` — an upstream typing gap in v16. These wrappers
 * keep the cast in one place instead of scattering it through the pages.
 */
type IconOnly = 'start' | 'end';

/** Pass as `iconPosition={iconOnly}` when wrapping isn't possible (e.g. `Menu.Target`). */
export const iconOnly = 'only' as IconOnly;
const only = iconOnly;

export interface IconButtonProps {
  icon: CanvasSystemIcon;
  'aria-label': string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const TertiaryIconButton = (props: IconButtonProps) => (
  <TertiaryButton {...props} iconPosition={only} />
);

export const SecondaryIconButton = (props: IconButtonProps) => (
  <SecondaryButton {...props} iconPosition={only} />
);
