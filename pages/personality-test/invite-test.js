import { useRouter } from "next/router";
import { useEffect } from "react";

const InviteTest = () => {
  const router = useRouter();
  const { invited, relation, user, test } = router.query;
  useEffect(() => {
    console.log(invited, relation, user, test);
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default InviteTest;
