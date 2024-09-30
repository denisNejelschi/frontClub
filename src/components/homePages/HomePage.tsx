import { useAppSelector } from '../../app/hooks';
import Loader from '../loader/Loader';


export default function HomePage() {
  //  You don't need to check for user data anymore
  const isLoading = useAppSelector(state => state.user.isLoading); // Assuming 'isLoading' is within the 'user' slice

  return (
    <div>
      {/* Show loading indicator if needed */}
      {isLoading && <Loader />}
      {/* Show the home message for all users */}
      {!isLoading && <h2>Home 🏡</h2>}
    </div>
  );
}