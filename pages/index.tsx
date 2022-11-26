import * as contentful from "contentful";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const client = contentful.createClient({
  space: "zml6srrh15p8",
  accessToken: "ZQgXTKmbrXGYWHFHQ_TymupzRjXr-nWRF9hNsB4cXhE",
});

const Index = () => {
  const [servers, setServers] = useState<
    contentful.Entry<{
      name: string;
      serverAddress: string;
      version: string;
      logo: contentful.Asset;
    }>[]
  >([]);

  useEffect(() => {
    client
      .getEntries<{
        name: string;
        serverAddress: string;
        version: string;
        logo: contentful.Asset;
      }>({
        content_type: "server",
      })
      .then((results) => results.items)
      .then((items) => setServers(items));
  }, []);

  return (
    <>
      <h1>Welcome to Madhouse Miners</h1>
      <p>
        We are a friendly bunch of people who run and play on a network of
        modded Minecraft servers
      </p>
      <p>Want to join us? Head over to our Discord server!</p>
      <Link href="https://discord.gg/q8PAJfHt" target="_discord">
        <Image
          className="joinDiscord"
          src="/images/discord.png"
          alt="Join our Discord server"
          width="400"
          height="136"
        />
      </Link>

      <h2>Our Servers</h2>
      <p>This is a list of the servers we've currently got running.</p>
      <div className="serverList">
        {servers.map((server) => (
          <div className="serverCard" key={server.sys.id}>
            <Image
              src={`https:${server.fields.logo.fields.file.url}`}
              alt={`${server.fields.name} Banner`}
              {...server.fields.logo.fields.file.details.image}
            />
            <h3>{server.fields.name}</h3>
            <p>Hostname: {server.fields.serverAddress}</p>
            <p>Version: {server.fields.version}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
