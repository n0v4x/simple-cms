interface ModuleDataProperties {
  [key: string]: ModuleProperty["defaultData"]
}

interface ModuleData extends TreeDataItem {
  module: {
    id: Module["id"],
    properties?: ModuleDataProperties
  }
}

interface ModuleProps<P extends any = any> {
  id?: string;
  properties?: P,
  children?: ReactNode,
  className?: string,
}

interface ModulePropertiesItem {
  id: string;
  name?: string;
  description?: string
  property: ModuleProperty
}

interface Module {
  id: string;
  name: string;
  category?: string;
  hasChildren: boolean;
  description: string;
  properties?: ModulePropertiesItem[],
  component: (props: ModuleProps) => JSX.Element
}

interface ModulePropertyProps<T> {
  onChange: (data: T) => void
  data: T,
}

interface ModuleProperty<T extends any = any> {
  name: string,
  description?: string,
  component: (props: ModulePropertyProps<T>) => JSX.Element,
  defaultData: T
}