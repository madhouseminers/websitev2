import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Logo {
  url: string;
  height: number;
  width: number;
}

interface Server {
  id: number;
  name: string;
  serverAddress: string;
  version: string;
  logo: Logo[];
}

interface APIResponse {
  id: number;
  attributes: {
    name: string;
    serverAddress: string;
    version: string;
    logo: {
      data: {
        attributes: {
          formats: {
            large: { height: number; width: number; url: string };
            medium: { height: number; width: number; url: string };
            small: { height: number; width: number; url: string };
          };
        };
      };
    };
  };
}

const baseUrl = "https://mhm-cms.fly.dev";

const Index = () => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    (async () => {
      const apiResults = await fetch(`${baseUrl}/api/servers?populate=*`);
      const data: APIResponse[] = (await apiResults.json()).data;
      setServers(
        data.map((entry) => ({
          id: entry.id,
          name: entry.attributes.name,
          serverAddress: entry.attributes.serverAddress,
          version: entry.attributes.version,
          logo: [
            {
              height:
                entry.attributes.logo.data.attributes.formats.large.height,
              width: entry.attributes.logo.data.attributes.formats.large.width,
              url: entry.attributes.logo.data.attributes.formats.large.url,
            },
          ],
        }))
      );
    })();
  }, []);

  if (!servers.length) return null;

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
          <div className="serverCard" key={server.id}>
            <Image
              src={`${server.logo[0].url}`}
              alt={`${server.name} Banner`}
              width={server.logo[0].width}
              height={server.logo[0].height}
            />
            <h3>{server.name}</h3>
            <p>Hostname: {server.serverAddress}</p>
            <p>Version: {server.version}</p>
          </div>
        ))}
      </div>

      <footer>&copy; 2022 Madhouse Miners</footer>
    </>
  );
};

export default Index;
