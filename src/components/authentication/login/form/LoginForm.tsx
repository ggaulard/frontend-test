import { Button, Form, FormItem, Grid, TextFieldInput } from "@aircall/tractor";
import { useState } from "react";

interface Props {
  onComplete: (username: string, password: string) => void;
}

export default function LoginForm({ onComplete }: Props) {
  const [hasError, setHasError] = useState<boolean>(false);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as any;
        const username = form.username.value;
        const password = form.password.value;
        if (!username || !password) {
          setHasError(true);
          return;
        }
        setHasError(false);
        onComplete(username, password);
      }}
    >
      <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns="1fr">
        <FormItem
          label="Username"
          name="username"
          validationStatus={hasError ? "error" : undefined}
          helpText={hasError ? "Username required" : undefined}
        >
          <TextFieldInput
            placeholder="john.doe@example.com"
            validationStatus={hasError ? "error" : undefined}
          />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          validationStatus={hasError ? "error" : undefined}
          helpText={hasError ? "Password required" : undefined}
        >
          <TextFieldInput type="password" />
        </FormItem>
        <FormItem>
          <Button type="submit" block>
            Login
          </Button>
        </FormItem>
      </Grid>
    </Form>
  );
}
