import { CSSProperties } from 'react';
import { BaseSourceProps } from '../types';
export type ImageColumnProps = BaseSourceProps & {
    sortable?: boolean;
    /** Thumbnail width in pixels. */
    width?: number;
    /** Thumbnail height in pixels. */
    height?: number;
    objectFit?: CSSProperties["objectFit"];
    borderRadius?: number;
    alt?: string;
};
export declare function ImageColumn({ source, label, sortable, width, height, objectFit, borderRadius, alt, }: ImageColumnProps): null;
//# sourceMappingURL=ImageColumn.d.ts.map