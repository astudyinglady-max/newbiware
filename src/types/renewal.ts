export interface ProjectInfo {
    projectName: string;
    coreConcept: string;
}

export interface Color {
    name: string;
    main: string;
    point?: string;
}

export interface ThemeConfiguration {
    colorPalette: {
        primary: Color;
        secondary: Color;
        accent: Color;
    };
}

export interface LinkItem {
    label: string;
    link: string;
}

export interface NavItem {
    label: string;
    link: string;
    subItems: string[];
}

export interface Layout {
    header: {
        logo: { src: string; alt: string };
        navigation: NavItem[];
        actions: Array<{ label: string; type: string; style?: string }>;
    };
    floatingDock: {
        enabled: boolean;
        items: Array<{ label: string; icon: string; link: string }>;
    };
    footer: {
        brandTextBig: string;
        address: string;
        copyright: string;
        columns: Array<{ title: string; links: LinkItem[] }>;
    };
}

export interface HeroProps {
    headline: string;
    subHeadline: string;
    ctaPrimary: LinkItem;
    ctaSecondary: LinkItem;
}

export interface StatsBarItem {
    value: string;
    label: string;
}

export interface StatsBarProps {
    items: StatsBarItem[];
}

export interface TabbedCardsItem {
    category: string;
    title: string;
    desc: string;
    icon: string;
    link: string;
}

export interface TabbedCardsProps {
    headline: string;
    description: string;
    tabs: string[];
    items: TabbedCardsItem[];
}

export interface SynergyItem {
    label: string;
    desc: string;
    color: string;
}

export interface SynergySectionProps {
    headline: string;
    center: string;
    left: SynergyItem;
    right: SynergyItem;
}

export interface FeatureItem {
    title: string;
    desc: string;
}

export interface WhyUBcareProps {
    headline: string;
    subHeadline: string;
    features: FeatureItem[];
}

export interface IRNewsProps {
    headline: string;
    stockPrice: string;
    stockChange: string;
    news: string[];
}

export interface ContactCTAProps {
    headline: string;
    primaryBtn: string;
    secondaryBtn: string;
}

export type SectionProps =
    | HeroProps
    | StatsBarProps
    | TabbedCardsProps
    | SynergySectionProps
    | WhyUBcareProps
    | IRNewsProps
    | ContactCTAProps;

export interface Section {
    id: string;
    component: string;
    props: SectionProps; // Union type of all possible props
}

export interface PageContent {
    home: {
        sections: Section[];
    };
}

export interface RenewalData {
    projectInfo: ProjectInfo;
    themeConfiguration: ThemeConfiguration;
    layout: Layout;
    pageContent: PageContent;
}
