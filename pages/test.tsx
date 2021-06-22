import { GetServerSideProps, GetStaticProps } from 'next'
import pagesData from "@data/pages.json";
import modulesData from "@data/modules.json";

import Editor from '@components/pages/Editor';

interface TestProps {
  initialData: PageData[];
}

const Test = ({ initialData }: TestProps) => {
  return <Editor initialData={initialData} />
}

export default Test;

export const getServerSideProps: GetServerSideProps = async () => {
  let data: PageData[] = (pagesData as PageData[]).map(pageData => {
    pageData.modules = modulesData;

    return pageData;
  })

  return {
    props: {
      initialData: data
    }
  }
}