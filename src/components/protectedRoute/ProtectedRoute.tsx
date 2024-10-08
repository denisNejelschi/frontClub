import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"



interface IPops {
    component: JSX.Element
}
export default function ProtectedRoute({ component }: IPops) {
    const { user } = useAppSelector(store => store.user)
    if (user.username) {
        return  component
    }
    return ( <Navigate to="/login"/>)
}