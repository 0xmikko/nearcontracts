export interface Template {
    id: string,
    name: string,
    description: string,
    content: string,
    signed: boolean,
}

export const TemplateNewDefault = {
    id: 'new',
    name: "New Template",
    description: "",
    content: "",
    signed: false,
}
