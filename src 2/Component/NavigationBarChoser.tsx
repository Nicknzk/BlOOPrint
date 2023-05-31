import NavigationHomePage from "./NavigationHomePage";
import NavigationLandingPage from "./NavigationLandingPage";

interface Props {
  authUser: any;
}

export default function NavigationBarChoser({ authUser }: Props) {
  return authUser ? <NavigationHomePage /> : <NavigationLandingPage />;
}
