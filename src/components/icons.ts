import type Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

/** Any Ionicons glyph name (FOUNDATIONS §7). */
export type IconName = ComponentProps<typeof Ionicons>['name'];
