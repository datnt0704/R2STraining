/** @format */
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Link to='/'>List post</Link>
      <Outlet />
    </>
  );
};

export default Root;
