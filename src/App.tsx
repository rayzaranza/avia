import { ArrowLeft, Home, TvIcon } from "lucide-react";
import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { Input } from "./components/Input";
import { Card } from "./components/Card";

export function App() {
  return (
    <div className="grid h-dvh place-content-center gap-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <Text variant="h1">título 1</Text>
          <Text variant="h2">título 2</Text>
          <Text variant="h3">título 3</Text>
          <Text variant="body">corpo</Text>
          <Text variant="caption">legenda</Text>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button icon={ArrowLeft}>botão</Button>
            <Button variant="accent">botão</Button>
            <Button variant="danger">botão</Button>
          </div>
          <div className="flex gap-4">
            <Card icon={TvIcon} title="séries" />
            <Card icon={Home} title="casa" />
          </div>
          <Input label="email" readOnly value="ray@zaranza.com.br" />
        </div>
      </div>
    </div>
  );
}
