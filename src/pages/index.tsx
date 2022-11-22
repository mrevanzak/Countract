import { useRouter } from 'next/router';

import withAuth, { USER_ROUTE } from '@/components/hoc/withAuth';

export default withAuth(IndexPage, 'all');
function IndexPage() {
  const router = useRouter();
  router.push(USER_ROUTE);
  return <div></div>;
}
