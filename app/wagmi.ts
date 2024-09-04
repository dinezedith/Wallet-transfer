import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseSepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'bc375bedd339481c19a1e23cac3fd380',
  chains: [
    baseSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [baseSepolia] : []),
  ],
  ssr: true,
});