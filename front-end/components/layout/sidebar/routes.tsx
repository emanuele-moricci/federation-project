import Link from "next/link";

const Routes = () => {
  return (
    <>
      <li>
        <Link href="/posts">
          <a>
            <span className="sidebar-normal">Posts</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/groups">
          <a>
            <span className="sidebar-normal">Groups</span>
          </a>
        </Link>
      </li>
    </>
  );
};

export default Routes;
