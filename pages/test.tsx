import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'

import ModuleViewport from '@components/layout/ModuleViewport'
import ModuleHierarchy from '@components/layout/ModuleHierarchy'
import ModuleLibraryModal from "@components/layout/ModuleLibraryModal";
import ModuleProperties from "@components/layout/ModuleProperties";
import Panel, { PanelHeader } from '@components/common/Panel'
import ScaleRange from '@components/common/ScaleRange';
import axios from "axios";
import api from "@api/index";
import { useApi } from '../src/contexts/ApiProvider';
import usePrevState from '@hooks/usePrevState';
import classNames from 'classnames';
import PanelBody from '@components/common/Panel/PanelBody';
import PanelFooter from '@components/common/Panel/PanelFooter';
import pagesData from "@data/pages.json";
import modulesData from "@data/modules.json";
import Sidebar from '@components/common/Sidebar';
import Menu from '@components/common/Menu';
import { Plus } from 'react-feather';
import Icon from '@components/common/Icon';
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