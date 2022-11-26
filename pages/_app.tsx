import "../styles/global.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
import {
  HomeIcon,
  ServerIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

const App = ({ Component, pageProps }) => (
  <div>
    <Head>
      <title>Madhouse Miners :: Unleash your inner Madness!</title>
    </Head>
    <header>
      <Image src={logo} alt="Madhouse Miners Logo" />
    </header>
    <main>
      <Component {...pageProps} />
    </main>
  </div>
);

export default App;
