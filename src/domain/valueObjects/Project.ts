export class Project {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly techStack: string[];

    constructor(id: string, title: string, description: string, techStack: string[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
    }
}