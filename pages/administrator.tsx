import { GetServerSideProps } from 'next'

import Editor from '@components/pages/Editor';
import ApiProvider from '@contexts/ApiProvider';

import { pages } from "@data/index";

import pageService from "@api/services/page";

interface AdministratorProps {
  data: PageData[];
}

const Administrator = ({ data }: AdministratorProps) => {
  return <ApiProvider>
    <Editor initialData={data} />
  </ApiProvider>
}

export default Administrator;

export const getServerSideProps: GetServerSideProps = async () => {
  const data: PageData[] = pages;

  // try {
  //   const foundPages = await pageService.get();

  //   if (foundPages.success === 1) {
  //     data = foundPages.data;
  //   }
  // } catch (err) {
  //   console.log(err);
  // }



  return {
    props: {
      data
    }
  }
}