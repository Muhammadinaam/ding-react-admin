import { InlineFieldRegistration } from '../context/InlineFieldsRegistry';
import { PrepareFormSubmitBodyOptions } from './prepareFormSubmitBody';
/** Build the create/update body from form values, auto-switching to multipart when needed. */
export declare function buildResourceFormSubmitBody(raw: Record<string, unknown>, payloadFieldPaths: string[], inlineRegistry?: Iterable<InlineFieldRegistration>, options?: PrepareFormSubmitBodyOptions): Record<string, unknown> | FormData;
//# sourceMappingURL=buildResourceFormSubmitBody.d.ts.map