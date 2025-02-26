import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export function PasswordInput(props: any) {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        placeholder="Enter password"
        {...props} // Прокидываем все пропсы
      />
      <InputRightElement>
        <Button size="sm" onClick={() => setShow(!show)}>
          {show ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
