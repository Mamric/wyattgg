import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const URLPATH =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "www.wyatt.gg";

  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage | Wyatt.gg</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.twitch.tv/scpWyatt">Wyatt.gg!</a>
        </h1>
        <p className={styles.description}>More to come soon.</p>
        <iframe
          src={`https://player.twitch.tv/?channel=scpwyatt&parent=${URLPATH}`}
          frameBorder="0"
          allowFullScreen={true}
          scrolling="no"
          height="378"
          width="620"
        ></iframe>
        <iframe
          id="chat_embed"
          src={`https://www.twitch.tv/embed/scpwyatt/chat?parent=${URLPATH}`}
          height="500"
          width="350"
        ></iframe>
        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>Socials &rarr;</h2>
            <p>Coming Soon...</p>
          </a>

          <a href="" className={styles.card}>
            <h2>About Me &rarr;</h2>
            <p>Coming Soon...</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Chat &rarr;</h2>
            <p>Coming Soon...</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Info &rarr;</h2>
            <p>Coming Soon...</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>Copyright &copy; 2021</footer>
    </div>
  );
}
