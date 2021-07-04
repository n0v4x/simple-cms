interface ModuleDataProperties {
  [key: string]: ModuleProperty["defaultData"]
}

interface ModuleData extends TreeDataItem {
  module: {
    id: Module["id"],
    properties?: ModuleDataProperties
  }
}

interface ModuleProps<P = any> {
  id?: string;
  properties: P;
  children?: ReactNode;
  className?: string;
  isEditorMode?: boolean;
}

interface ModulePropertiesItem {
  id: string;
  name?: string;
  description?: string
  property: ModuleProperty
}

interface Property<PF extends any = any> {
  name: string;
  defaultValue: PF
  component: (props: PropertyProps) => JSX.Element
}

interface ModuleProperties {
  [key: string]: Property
}

interface Module {
  id: string;
  name: string;
  category?: string;
  hasChildren: boolean;
  description: string;
  properties?: ModuleProperties,
  component: (props: ModuleProps) => JSX.Element
}

interface ModuleProperty<T extends any = any> {
  name: string,
  description?: string,
  component: (props: ModulePropertyProps<T>) => JSX.Element,
  defaultData: T
}


type ModulePropsProperties<T extends ModuleProperties> = { [K in keyof T]: T[K]["defaultValue"] }

interface PropertyProps {
  name: string
}