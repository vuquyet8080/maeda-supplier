import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session } = useSession();

  if (typeof window === 'undefined') return null;

  if (session) {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-90px)] w-full flex flex-col space-y-4 items-center justify-center">
      <Link href="/login">
        <a className="flex items-center btn-primary px-8 py-3 rounded-md">Login</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
