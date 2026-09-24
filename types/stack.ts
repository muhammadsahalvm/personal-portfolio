export type StackItem = {
    name: string;
    icon: string;
    featured?: boolean;
};

export type StackCategories = {
    programmingLanguages: StackItem[];
    frontend: StackItem[];
    backend: StackItem[];
    database: StackItem[];
    toolsCloud: StackItem[];
    coreConcepts: StackItem[];
    aiEmergingTech: StackItem[];
};

