interface ModuleData {
  id: number,
  type: string,
  config?: {
    [key: string]: any
  },
  children?: ModuleData[]
}

interface Module {
  type: string;
  name: string;
  category?: string;
  description: string;
  Component: (props: any) => JSX.Element,
  controller: {
    color: string
  }
}