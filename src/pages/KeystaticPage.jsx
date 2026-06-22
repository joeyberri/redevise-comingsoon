import { Keystatic } from '@keystatic/core/ui';
import keystaticConfig from '../../keystatic.config';

export default function KeystaticPage() {
  return <Keystatic config={keystaticConfig} />;
}
