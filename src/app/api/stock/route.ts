import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch Naver Finance page for UBcare (032620)
    const response = await fetch('https://finance.naver.com/item/main.naver?code=032620', {
       headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      },
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const html = await response.text();
    const $ = cheerio.load(html);


    // 2. Extract Data
    // Selector for current price: div.today > p.no_today > span.blind
    const price = $('.today .no_today .blind').first().text();
    
    // Selector for price change: div.today > p.no_exday > span.blind
    const changeAmount = $('.today .no_exday .blind').first().text();
    
    // Selector for up/down icon/text to determine sign
    // Naver uses .ico.up or .ico.down OR .no_up / .no_down wrapper
    const isUp = $('.today .no_exday').first().find('.ico.up, .ico_up, .no_up').length > 0;
    const isDown = $('.today .no_exday').first().find('.ico.down, .ico_down, .no_down').length > 0;
    
    let changeSign = '';
    if (isUp) changeSign = '+';
    else if (isDown) changeSign = '-';

    // Selector for percent change
    // Usually extracting text from the breakdown: second .no_exday usually contains percent
    // inside .rate_info often has structure: 
    // .rate_info -> .today -> .no_today (price) -> .no_exday (change) -> .no_exday (percent)?
    // Or sometimes just grab all blinds in today/rate_info
    
    // Attempt 1: Check second .blind in the SAME .no_exday (often they are paired)
    let percentChange = $('.today .no_exday .blind').eq(1).text();
    
    // Attempt 2: If empty, try checking specific classes or next sibling
    if (!percentChange) {
       // Sometimes it's in a different structure
       // Try just grabbing the 3rd blind in .rate_info (0: price, 1: change, 2: percent usually)
       percentChange = $('.rate_info .blind').eq(2).text();
    }


    // Formatting
    const formattedPrice = `${price} KRW`;
    const formattedChange = `${changeSign}${changeAmount} (${changeSign}${percentChange}%)`;

    return NextResponse.json({
      price: price ? formattedPrice : '5,720 KRW', // Fallback
      change: changeAmount ? formattedChange : '+50 (+0.88%)', // Fallback
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stock fetch error:', error);
    return NextResponse.json({ 
      price: '5,720 KRW', 
      change: '+50 (+0.88%)',
      error: 'Failed to fetch' 
    }, { status: 500 });
  }
}
