import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Loader from '../loader/Loader';

export default function HomePage() {
  const isLoading = useAppSelector(state => state.user.isLoading);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(true);
    if (isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 100);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  return (
    <div>
      {showLoader && <Loader />}
      <h2>Home 🏡</h2>
    </div>
  );
}
