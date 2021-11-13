import { Box, Flex, Spacer } from "@aircall/tractor";
import LoginForm from "../../components/authentication/login/form/LoginForm";
import { useLogin } from "./useLogin";

export default function LoginPage() {
  const { login } = useLogin();
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box
        margin={["10px", "30px"]}
        boxShadow={5}
        borderRadius={18}
        display="inline-block"
        width={["100%", "400px"]}
      >
        <Spacer space="s" direction="vertical" padding="30px" width="100%">
          <img src="logo-label.svg" alt="logo" style={{ maxWidth: "100%" }} />
          <LoginForm
            onComplete={(username, password) => login(username, password)}
          />
        </Spacer>
      </Box>
    </Flex>
  );
}
