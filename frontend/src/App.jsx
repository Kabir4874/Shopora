import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/react";
import PageLoader from "./components/PageLoader";

function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <button className="btn btn-primary">test</button>
    </>
  );
}

export default App;
