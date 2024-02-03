import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }
  
  const coinToss = Math.random() > 0.5 ? 'heads' : 'tails';

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Play again',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/${coinToss}.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
