export type StackItem = {
    name: string;
    icon: string;
    featured?: boolean;
};

export type StackCategories = {
    languages?: StackItem[];
    programmingLanguages?: StackItem[];
    frontend: StackItem[];
    backend: StackItem[];
    database: StackItem[];
    tools?: StackItem[];
    cloudCiCd?: StackItem[];
    toolsCloud?: StackItem[];
    coreConcepts: StackItem[];
    aiGenerativeAi?: StackItem[];
    aiEmergingTech?: StackItem[];
};

