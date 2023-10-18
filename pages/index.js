import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';

const techStack = ['Node.js', 'JavaScript/TypeScript', 'MySQL', 'MongoDB', 'Redis'];

export default function Home({ allPostsData }) {
  const listItems = techStack.map((stack, idx) => (<li key={idx}>{stack}</li>));
  const displayPosts = allPostsData.map(({ id, date, title }) => (
    <li key={id} className={utilStyles.listItem}>
      <Link href={`/posts/${id}`}>{title}</Link>
      <br />
      <small className={utilStyles.lightText}>
        <Date dateString={date} />
      </small>
    </li>
  ))
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><b>Hi, I'm Taiwo. I'm a software engineer, primarily a backend engineer, currently learning React and Next.js.</b>
        </p>
        <h2 className={utilStyles.headingMd}>Tech Stack</h2>
        <ul>
          {listItems}
        </ul>

        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* display posts */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul>
          {displayPosts}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}