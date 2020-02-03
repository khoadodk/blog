import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';
import renderHTML from 'react-render-html';

const Card = ({ blog }) => {
  const { categories, tags } = blog;
  const showBlogCategories = categories =>
    categories.map(e => (
      <Link href={`/categories/${e.slug}`} key={e._id}>
        <a href="" className="btn btn-outline-info mr-1 ml-1 mt-2">
          {e.name}
        </a>
      </Link>
    ));

  const showBlogTags = tags =>
    tags.map(e => (
      <Link href={`/tags/${e.slug}`} key={e._id}>
        <a href="" className="btn btn-outline-primary mr-1 ml-1 mt-2">
          {e.name}
        </a>
      </Link>
    ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="display-5 pb-2  ">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark">
          Written by{' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.name}</a>
          </Link>{' '}
          |{moment(blog.updatedAt).format('MMM Do YYYY')}
        </p>
      </section>
      <section>
        {showBlogCategories(categories)}
        {showBlogTags(tags)}
      </section>
      <div className="row pt-4">
        <div className="col-md-4 d-flex justify-content-center">
          <section>
            <img
              src={`${API}/blog/photo/${blog.slug}`}
              alt={`${blog.title}`}
              className="img img-fluid "
              style={{ maxHeight: '150px', width: 'auto' }}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3"> {renderHTML(blog.excerpt)}...</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
