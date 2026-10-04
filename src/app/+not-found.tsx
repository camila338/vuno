import { Redirect } from 'expo-router';

// Any unknown URL (e.g. the prototype served from a sub-path) lands on the Save home.
export default function NotFound() {
  return <Redirect href="/" />;
}
