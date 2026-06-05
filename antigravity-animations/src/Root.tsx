import "./index.css";
import { Composition } from "remotion";
import { ConcurrencyModel } from "./components/ConcurrencyModel";
import { DbusKeyring } from "./components/DbusKeyring";
import { SandboxSafety } from "./components/SandboxSafety";
import { McpMigration } from "./components/McpMigration";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="concurrency-model"
        component={ConcurrencyModel}
        durationInFrames={210}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="dbus-keyring"
        component={DbusKeyring}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="sandbox-safety"
        component={SandboxSafety}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="mcp-migration"
        component={McpMigration}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
