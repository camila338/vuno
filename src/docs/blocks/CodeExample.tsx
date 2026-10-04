import { Source } from '@storybook/addon-docs/blocks';

/** Code sample with a copy button (Storybook's Source block). */
export function CodeExample({ code, language = 'tsx' }: { code: string; language?: 'tsx' | 'typescript' | 'json' | 'bash' }) {
  return <Source code={code.trim()} language={language} dark={false} />;
}
