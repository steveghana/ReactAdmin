export interface IDoors {
    idata: Record<string, any>[];
    noIntro?: boolean;
    withLayout?: boolean;
}
export type IToolbar = {
    noPermission?: boolean;
    save: () => void;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
export type Anchor = 'left' | 'right';
export type ICustomDeleteCreate = {
    withCreate?: boolean;

    setClicked?: React.Dispatch<React.SetStateAction<boolean>>;

    handleSearch: (searchValue: string) => void;
    searchTerm: string;
    label: string;
};
export interface IWorkers {
    workers: Record<string, any>[];
    noIntro?: boolean;
    withLayout?: boolean;
}
export type IEdit = {
    intro: Record<string, string>;
    name?: string;
    withTable?: boolean;
};
export interface Item {
    [key: string]: any;
}
export interface ItemProps {
    email: string;
    name: string;
    updatedAt: string;
    phoneNumber: string;
    addressStreet: string;
}
export interface IDetailsProps {
    data: ItemProps;
}
export interface LocationListProps {
    data: any[];
    nointro?: boolean;
}
export const barColors = ['#FFB448', '#6CEAE6', '#FF6663', '#FFB448', '#6CEAE6', '#FF6663', '#FFB448'];

export const chartData = [
    {
        name: 'Sun',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Mon',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Tues',
        uv: 3000,
        pv: 2398,
        amt: 2210,
    },
    {
        name: 'Wed',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Thurs',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Fri',
        uv: 2890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Sat',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
];

