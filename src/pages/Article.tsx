import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react';

interface ArticleData {
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  content: React.ReactNode;
}

interface ArticleProps {
  articles: { [key: string]: ArticleData };
}

const Article = ({ articles }: ArticleProps) => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !articles[slug]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary-700 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            to="/learn" 
            className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Learn</span>
          </Link>
        </div>
      </div>
    );
  }

  const article = articles[slug];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/learn" 
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Learn</span>
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-12">
            <div className="article-content max-w-none text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <Link 
              to="/learn" 
              className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </article>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-700 to-primary-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Continue Your Journey
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get more sacred wisdom, moon phase reminders, and exclusive meditations delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="bg-white text-primary-700 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

