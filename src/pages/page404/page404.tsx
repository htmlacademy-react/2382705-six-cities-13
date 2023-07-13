import {Link} from 'react-router-dom';
import './style.css';

function Page404(): JSX.Element {
  return (
    <div className='body'>
      <div className='form'>
        <h1>404</h1>
        <p>page not found</p>
        <form>
          <Link to='/'>
            <button>
              To Main Page
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Page404;