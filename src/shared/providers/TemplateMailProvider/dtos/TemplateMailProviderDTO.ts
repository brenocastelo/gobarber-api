interface TemplateVariables {
  [key: string]: string | number;
}

export default interface TemplateMailProviderDTO {
  file: string;
  variables: TemplateVariables;
}
