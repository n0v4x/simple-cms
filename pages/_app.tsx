import type { AppProps } from 'next/app'
import '../scss/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}
export default MyApp
