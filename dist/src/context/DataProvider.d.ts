import { ReactNode } from 'react';
import { DataProvider as DataProviderContract } from '../data/dataProviderTypes';
export type DataProviderProps = {
    children: ReactNode;
    /** Your API client (REST adapter, in-memory mock, etc.). */
    value: DataProviderContract;
};
export declare function DataProvider({ children, value }: DataProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useDataProvider(): DataProviderContract;
//# sourceMappingURL=DataProvider.d.ts.map