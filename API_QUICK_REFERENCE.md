// API Integration Quick Reference

// ============================================
// 1. USING THE API IN A COMPONENT
// ============================================

import { useFetchEndpoint } from '@/hooks/useAPI';

function MyComponent() {
  // Auto-fetches on mount, caches for 5 minutes
  const { data, loading, error, refetch } = useFetchEndpoint('/api/projects');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {data?.map(item => <div key={item.id}>{item.title}</div>)}
      <button onClick={refetch}>Refresh</button>
    </>
  );
}

// ============================================
// 2. MANUAL API CALLS (if needed)
// ============================================

import { useAPI } from '@/hooks/useAPI';

function ManualFetch() {
  const { fetchData, state } = useAPI();

  const handleClick = async () => {
    try {
      const data = await fetchData('/api/projects', { skipCache: true });
      console.log(data);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  return <button onClick={handleClick}>Fetch Now</button>;
}

// ============================================
// 3. POSTING DATA (Contact Form Example)
// ============================================

import { useAPI } from '@/hooks/useAPI';

function ContactForm() {
  const { fetchData } = useAPI();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetchData('/api/contact', {
        method: 'POST',
        body: formData,
      });
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {/* ... more fields ... */}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

// ============================================
// 4. CLEARING ALL CACHED DATA
// ============================================

const { clearCache } = useAPI();
clearCache(); // Useful on logout or manual refresh

// ============================================
// 5. ADDING A NEW API ENDPOINT
// ============================================

// 1. Create api/experience.js:
export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const experience = await db.query('SELECT * FROM experience');
    res.setHeader('Cache-Control', 'public, s-maxage=600');
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

// 2. Use in component:
const { data: experience } = useFetchEndpoint('/api/experience');

// ============================================
// 6. PERFORMANCE TIPS
// ============================================

// ✅ DO:
- Use useFetchEndpoint() for automatic caching
- Return early with loading/error states
- Memoize expensive computations with useMemo
- Use refetch() button to manually refresh cache

// ❌ DON'T:
- Call fetch() directly; use the hook instead
- Fetch same endpoint multiple times on mount
- Store API data in local component state if global state exists
- Ignore error boundaries; always handle errors

// ============================================
// 7. CACHE BEHAVIOR
// ============================================

// Default: 5 minutes (300000ms)
// After 5 minutes, next fetch will request fresh data
// Use skipCache: true to force refresh immediately

const { refetch } = useFetchEndpoint('/api/projects');
refetch(); // Equivalent to: fetchData('/api/projects', { skipCache: true })

// ============================================
// 8. DEBUGGING
// ============================================

// Check global API state in DevTools:
import { useAPI } from '@/hooks/useAPI';
const { data, loading, error } = useAPI();
console.log('API State:', { data, loading, error });

// Clear cache and retry:
const { clearCache } = useAPI();
clearCache();
// Then refetch component
