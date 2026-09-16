import {createStencil} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

export type StatusTone = 'positive' | 'caution' | 'critical' | 'muted';

/**
 * Canvas Kit's `StatusIndicator` is deprecated in v16 (it moved to the preview
 * package), so this showcase ships its own status chip built with
 * `createStencil` and system tokens — which doubles as a demo of the styling
 * API you'd use for any custom component in a Canvas app.
 */
const statusPillStencil = createStencil({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: system.space.x1,
    paddingInline: system.space.x2,
    paddingBlock: system.space.x1,
    borderRadius: system.shape.round,
    fontSize: system.fontSize.subtext.large,
    fontWeight: system.fontWeight.medium,
    lineHeight: system.lineHeight.subtext.large,
    whiteSpace: 'nowrap',
  },
  modifiers: {
    tone: {
      positive: {
        backgroundColor: system.color.bg.positive.softer,
        color: system.color.fg.positive.stronger,
      },
      caution: {
        backgroundColor: system.color.bg.caution.softer,
        color: system.color.fg.caution.stronger,
      },
      critical: {
        backgroundColor: system.color.bg.critical.softer,
        color: system.color.fg.critical.stronger,
      },
      muted: {
        backgroundColor: system.color.bg.alt.default,
        color: system.color.fg.muted.stronger,
      },
    },
  },
  defaultModifiers: {tone: 'muted'},
});

export const StatusPill = ({tone, children}: {tone: StatusTone; children: React.ReactNode}) => (
  <span {...statusPillStencil({tone})}>{children}</span>
);
