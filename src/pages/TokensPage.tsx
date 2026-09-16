import {system} from '@workday/canvas-tokens-web';
import {createStyles, cssVar} from '@workday/canvas-kit-styling';
import {Text} from '@workday/canvas-kit-react/text';

import {DemoSection} from '../components/DemoSection';
import {PageHeader} from '../components/PageHeader';

const gridStyles = createStyles({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
  gap: system.space.x4,
  width: '100%',
});

const swatchStyles = createStyles({
  border: `1px solid ${system.color.border.container}`,
  borderRadius: system.shape.x1,
  overflow: 'hidden',
});

const swatchChipStyles = createStyles({
  height: system.space.x14,
});

const swatchLabelStyles = createStyles({
  padding: system.space.x2,
  fontFamily: system.fontFamily.mono,
  fontSize: system.fontSize.subtext.medium,
  color: system.color.text.hint,
  wordBreak: 'break-all',
});

const rowStyles = createStyles({
  display: 'flex',
  alignItems: 'center',
  gap: system.space.x4,
  paddingBlock: system.space.x2,
  width: '100%',
});

const rowLabelStyles = createStyles({
  fontFamily: system.fontFamily.mono,
  fontSize: system.fontSize.subtext.medium,
  color: system.color.text.hint,
  minWidth: '180px',
});

const barStyles = createStyles({
  height: system.space.x4,
  backgroundColor: system.color.bg.primary.default,
  borderRadius: system.shape.half,
});

const depthCardStyles = createStyles({
  backgroundColor: system.color.surface.default,
  borderRadius: system.shape.x2,
  padding: system.space.x4,
  fontFamily: system.fontFamily.mono,
  fontSize: system.fontSize.subtext.medium,
  color: system.color.text.hint,
});

/** `system.color.<group>` values are CSS variable *names*, so wrap with cssVar to use them. */
const Swatch = ({name, token}: {name: string; token: string}) => (
  <div className={swatchStyles}>
    <div className={swatchChipStyles} style={{backgroundColor: cssVar(token)}} />
    <div className={swatchLabelStyles}>{name}</div>
  </div>
);

const colorGroups = [
  {label: 'Background', prefix: 'bg', group: system.color.bg},
  {label: 'Foreground', prefix: 'fg', group: system.color.fg},
  {label: 'Border', prefix: 'border', group: system.color.border},
] as Array<{label: string; prefix: string; group: Record<string, unknown>}>;

/** Semantic colour groups nest one level deep (bg.positive.softer), so flatten them. */
const flatten = (group: Record<string, unknown>, prefix: string) => {
  const out: Array<{name: string; token: string}> = [];
  for (const [key, value] of Object.entries(group)) {
    if (typeof value === 'string') {
      out.push({name: `${prefix}.${key}`, token: value});
    } else if (value && typeof value === 'object') {
      for (const [sub, subValue] of Object.entries(value as Record<string, string>)) {
        if (typeof subValue === 'string') {
          out.push({name: `${prefix}.${key}.${sub}`, token: subValue});
        }
      }
    }
  }
  return out;
};

const typeLevels = [
  'title.large',
  'title.medium',
  'title.small',
  'heading.large',
  'heading.medium',
  'heading.small',
  'body.large',
  'body.medium',
  'body.small',
  'subtext.large',
  'subtext.medium',
  'subtext.small',
] as const;

const spaceTokens = Object.entries(system.space) as Array<[string, string]>;
const shapeTokens = Object.entries(system.shape) as Array<[string, string]>;
const depthTokens = Object.entries(system.depth) as Array<[string, string]>;

export const TokensPage = () => (
  <>
    <PageHeader
      title="Design Tokens"
      intro="Canvas tokens are plain CSS custom properties. The JS exports in @workday/canvas-tokens-web hold variable names, not values — wrap them in cssVar() to reference them, or use them directly inside createStyles."
    />

    {colorGroups.map(({label, prefix, group}) => (
      <DemoSection
        key={prefix}
        title={`Colour — ${label.toLowerCase()}`}
        description={`system.color.${prefix} tokens, rendered live from the token package.`}
        stack={true}
      >
        <div className={gridStyles}>
          {flatten(group, prefix).map(swatch => (
            <Swatch key={swatch.name} name={swatch.name} token={swatch.token} />
          ))}
        </div>
      </DemoSection>
    ))}

    <DemoSection
      title="Type ramp"
      description="Four levels — title, heading, body, subtext — each in small, medium and large. Pass them to Text via typeLevel."
      stack={true}
      code={`<Text typeLevel="heading.medium">Section heading</Text>`}
    >
      {typeLevels.map(level => (
        <div key={level} className={rowStyles}>
          <span className={rowLabelStyles}>{level}</span>
          <Text typeLevel={level}>The quick brown fox</Text>
        </div>
      ))}
    </DemoSection>

    <DemoSection
      title="Space scale"
      description="All spacing derives from a 4px base unit. Use these instead of hard-coded pixels."
      stack={true}
      code={`padding: system.space.x4`}
    >
      {spaceTokens.map(([name, token]) => (
        <div key={name} className={rowStyles}>
          <span className={rowLabelStyles}>space.{name}</span>
          <div className={barStyles} style={{width: cssVar(token)}} />
        </div>
      ))}
    </DemoSection>

    <DemoSection
      title="Shape scale"
      description="Corner radii, from square through fully round."
      stack={true}
      code={`borderRadius: system.shape.x2`}
    >
      <div className={gridStyles}>
        {shapeTokens.map(([name, token]) => (
          <div key={name} className={swatchStyles}>
            <div
              className={swatchChipStyles}
              style={{
                backgroundColor: cssVar(system.color.bg.primary.default),
                borderRadius: cssVar(token),
              }}
            />
            <div className={swatchLabelStyles}>shape.{name}</div>
          </div>
        ))}
      </div>
    </DemoSection>

    <DemoSection
      title="Depth scale"
      description="Six elevation levels. Higher depth means the surface is closer to the user and more temporary."
      stack={true}
      code={`boxShadow: system.depth[2]`}
    >
      <div className={gridStyles}>
        {depthTokens.map(([name, token]) => (
          <div key={name} className={depthCardStyles} style={{boxShadow: cssVar(token)}}>
            depth.{name}
          </div>
        ))}
      </div>
    </DemoSection>
  </>
);
