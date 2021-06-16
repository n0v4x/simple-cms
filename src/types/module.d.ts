interface ModuleDataProperties {
  [key: string]: ModuleProperty["defaultData"]
}

interface ModuleData extends TreeDataItem {
  module: {
    id: Module["id"],
    properties?: ModuleDataProperties
  }
}

interface ModuleProps<P extends ModuleProperties> {
  properties: {
    [K in keyof P]: P[K] extends ModulePropertiesItem ? P[K]["property"]["defaultData"] : undefined
  },
  children?: ReactNode
}

interface ModulePropertiesItem<SP extends ModuleProperty = ModuleProperty> {
  name: string;
  description?: string
  property: SP
}

interface ModuleProperties {
  [key: string]: ModulePropertiesItem
}

interface Module<P extends ModuleProperties | undefined = undefined> {
  id: string;
  name: string;
  category?: string;
  description: string;
  properties?: P,
  component: (props: ModuleProps<P>) => JSX.Element
}

interface ModulePropertyProps<T> {
  onChange: ({
    data
  }: T) => void
  data: T,
}

interface ModuleProperty<T = any> {
  name: string,
  description?: string,
  component: (props: ModulePropertyProps<T>) => JSX.Element,
  defaultData: T
}