export type ProjectItem = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    status?: string;
    highlights?: string[];
    image?: string;
    demo?: string;
    repo?: string;
    stack?: string[];
    caseStudy?: {
        problem: string;
        solution: string;
        architectureDiagram?: {
            client: string;
            frontend: string;
            backend: string;
            orm: string;
            database: string;
            roles: string[];
        };
    };
};

