import { GetServerSideProps } from 'next'
import Head from "next/head"
import PageModules from '@components/layout/PageModules'
import pageService from "@api/services/page";

import { pages } from "@data/index"

interface PageProps {
  data: PageData
}

const Page = ({ data }: PageProps) => {
  return <div className="page">
    <Head>
      <title>
        {data.title}
      </title>
    </Head>

    <PageModules data={data.modules || []} />
  </div>
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let data: PageData | null = null;

  // try {
  //   const foundPages = await pageService.get({ url: ctx.resolvedUrl });

  //   if (foundPages.success === 1 && foundPages.data.length > 0) {
  //     data = foundPages.data[0];
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  const foundPage = pages.find(page => page.url === ctx.resolvedUrl);

  if (foundPage) {
    data = foundPage;
  }

  return data ? {
    props: {
      data
    }
  } : {
    notFound: true
  }
}