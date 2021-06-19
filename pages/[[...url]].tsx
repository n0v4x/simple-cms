import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import Head from "next/head"
import PageModules from '@components/layout/PageModules'


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
  let data: PageData = {
    id: "home",
    url: "/",
    modules: [],
    title: "Home"
  };

  if (ctx.resolvedUrl === data.url) {
    return {
      props: {
        data
      }
    }
  }

  return {
    notFound: true
  }
}