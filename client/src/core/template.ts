export interface Template {
    id: string,
    name: string,
    description: string,
    content: string,
    isPublic: boolean,
}

export const TemplateNewDefault : Template = {
    id: 'new',
    name: "New Template",
    description: "",
    content: "",
    isPublic: false,
}
