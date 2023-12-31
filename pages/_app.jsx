import Head from "next/head";
import Layout from "../layout";
// styling
import "../styles/globals.css";

// imports
import { store } from "@/global/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>CryptoPad</title>
        <meta name="title" content="Metarootz — List, Trade and Earn" />
        <meta property="og:image" content="/logo300.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo300.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

// const Tags = () => {
//   return (
//     <>
//       {/* <!-- Primary Meta Tags --> */}
//       <meta
//         name="description"
//         content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
//       />

//       {/* <!-- Open Graph / Facebook --> */}
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content="https://metatags.io/" />
//       <meta
//         property="og:title"
//         content="Meta Tags — Preview, Edit and Generate"
//       />
//       <meta
//         property="og:description"
//         content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
//       />
//       <meta
//         property="og:image"
//         content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
//       />

//       {/* <!-- Twitter --> */}
//       <meta property="twitter:card" content="summary_large_image" />
//       <meta property="twitter:url" content="https://metatags.io/" />
//       <meta
//         property="twitter:title"
//         content="Meta Tags — Preview, Edit and Generate"
//       />
//       <meta
//         property="twitter:description"
//         content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
//       />
//       <meta
//         property="twitter:image"
//         content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
//       ></meta>
//     </>
//   );
// };

export default MyApp;
