import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Flip Coin!',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/splash_image.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Coin flip frame',
  description: 'Heads or tails? Find out!',
  openGraph: {
    title: 'Coin flip frame',
    description: 'Heads or tails? Find out!',
    images: [`${NEXT_PUBLIC_URL}/splash_image.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Coin Flip frame</h1>
      <p>Simply cast this URL to embed a coin flip in your cast!</p>
      <a href='https://warpcast.com/dhai.eth' target='_blank' rel='noreferrer'>
        Follow me on Farcaster
      </a>
    </>
  );
}
