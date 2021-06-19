import { GetStaticProps } from 'next'

interface HomeProps {
  largestModuleId: number;
  modules: ModuleData[];
}

const Login = ({ }: HomeProps) => {
  return
}

export default Login;


export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    }
  }
}