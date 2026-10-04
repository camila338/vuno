// Types for imports that Vite resolves in the web Storybook.
declare module '*.css';
declare module '*.md?raw' {
  const content: string;
  export default content;
}
