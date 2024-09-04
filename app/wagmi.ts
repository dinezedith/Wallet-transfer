import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  polygonZkEvmCardona
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'bc375bedd339481c19a1e23cac3fd380',
  chains: [
    polygonZkEvmCardona,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [polygonZkEvmCardona] : []),
  ],
  ssr: true,
});