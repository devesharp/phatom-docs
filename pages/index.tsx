import Head from 'next/head'
import {DocsContainer} from "../app/components/DocsPage/DocsContainers";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DocsContainer api={props.content} />
    </>
  )
}

export async function getStaticProps(context: any) {
  const res = await fetch('http://localhost:3001/api/swagger');
  const data = await res.json();

  return {
    // Passed to the page component as props
    props: { content: data },
  };
}
