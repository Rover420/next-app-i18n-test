export default async function Head() {

  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');

  const price = await res?.json();

  return (
    <>
      <meta charSet="utf-8" />
      <title>{price ? `BTC ${price?.bitcoin?.usd?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}$` : 'Best app ever'}</title>
      <meta name="description" content="How to do i18n in Next.js 13 within app directory" />
      <link rel="icon" href="/logo/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
      <link rel="manifest" href="/logo/site.webmanifest" />
    </>
  )
}
