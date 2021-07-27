import { HTMLAttributes } from 'react';

export interface IPropsTabs extends HTMLAttributes<HTMLElement> {
    children: any[];
}

export interface IPropsTab {
    activeTab: string;
    label: string;
    onClickTab?: (label: string) => any;
}
