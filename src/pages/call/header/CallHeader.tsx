import { Skeleton, Spacer, UserOutlined } from "@aircall/tractor";
import { useUserContext } from "../../../context/UserContext";

export default function CallHeader() {
  const { user } = useUserContext();
  return (
    <>
      <img alt="logo" src="logo-icon.svg" height="40px" />
      <Spacer alignItems="center" justifyContent="flex-end">
        <div>{user ? user.username : <Skeleton width={128} height={20} />}</div>
        <UserOutlined />
      </Spacer>
    </>
  );
}
