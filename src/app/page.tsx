import UserInfo from "./components/User";

const user = {
  id : "asd",
  userEmail:"string",
  password:"string",
  nickname:"string",
  joinDate:"string"
}

export default function Home() {
  return (
    <div>
      <UserInfo user={user}></UserInfo>
    </div>
  );
}
