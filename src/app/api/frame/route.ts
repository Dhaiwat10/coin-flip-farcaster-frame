import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest): Promise<Response> {
  const body: FrameRequest = await req.json();

  const { isValid } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse('Invalid request', { status: 400 });
  }

  const coinToss = Math.random() > 0.5 ? 'heads' : 'tails';

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Flip Again!',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/${coinToss}.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export const dynamic = 'force-dynamic';
