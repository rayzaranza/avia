import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import { Plus, ArrowLeft, Trash } from "lucide-react";
import { Text } from "./components/Text";

export function App() {
  return (
    <div className="grid h-dvh place-content-center gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Text variant="h1">título 1</Text>
          <Text variant="h2">título 2</Text>
          <Text variant="h3">título 3</Text>
          <Text variant="body">corpo</Text>
          <Text variant="caption">legenda</Text>
        </div>

        <div className="flex place-items-center gap-5">
          <Icon icon={Plus} size="large" />
          <Icon icon={Plus} />
          <Icon icon={Plus} size="small" />
        </div>

        <div className="flex place-items-center gap-5">
          <Icon icon={ArrowLeft} size="large" />
          <Icon icon={ArrowLeft} />
          <Icon icon={ArrowLeft} size="small" />
        </div>

        <div className="flex place-items-center gap-5">
          <Icon icon={Trash} size="large" />
          <Icon icon={Trash} />
          <Icon icon={Trash} size="small" />
        </div>

        <p className="max-w-2xl text-xl">
          sdhai ygsdo haodhy ophs odgasd iogasdh asd gaosfc asdaisdais naaois7
          aosasdiasdaggadga asdgaysdgai agsdaisg gs sdgaa aidad agsda s
        </p>
      </div>

      <div className="flex gap-4">
        <Button>
          <Icon icon={Plus} />
          botão
        </Button>
        <Button variant="accent">botão</Button>
        <Button variant="danger">botão</Button>
      </div>
    </div>
  );
}
