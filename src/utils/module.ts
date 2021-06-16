


export const makeTreeData = <T extends TreeDataItem>(dataList: T[]): T[] => {
  return dataList.map((item) => ({
    ...item,
    hasChildren:
      dataList.filter((i) => i.parentId === item.id).length > 0,
  }));
}
