import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>EZ&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Pay&nbsp;</h1>
        <br/>
        <h1 className={title()}>
          Buying Made Easy.
        </h1>
        <h2 className={subtitle({ class: "mt-2" })}>
          Effortless, fast and secure.
        </h2>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started <Code color="primary"><a href="/dashboard">Sign up</a></Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
