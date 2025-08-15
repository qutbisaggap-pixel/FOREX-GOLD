import React, { useEffect, useState } from "react";

export default function InfoHargaEmasForex() {
  const [hargaEmas, setHargaEmas] = useState(null);
  const [hargaForex, setHargaForex] = useState(null);
  const REFRESH_MS = 60000; // 1 menit refresh

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: GANTI DENGAN API NYATA
        // Contoh pakai Metals-API (https://metals-api.com/) & Twelve Data (https://twelvedata.com/)
        // Ganti API_KEY dengan kunci API kamu

        const emasRes = await fetch(
          `https://metals-api.com/api/latest?access_key=API_KEY&base=USD&symbols=XAU`
        );
        const emasData = await emasRes.json();
        setHargaEmas(emasData.rates?.XAU);

        const forexRes = await fetch(
          `https://api.twelvedata.com/price?symbol=EUR/USD&apikey=API_KEY`
        );
        const forexData = await forexRes.json();
        setHargaForex(forexData.price);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Info Harga Emas & Forex Harian</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Harga Emas (USD/Oz)</h2>
          <p className="text-xl">{hargaEmas ? `$${hargaEmas}` : "Memuat..."}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">EUR/USD</h2>
          <p className="text-xl">{hargaForex ? hargaForex : "Memuat..."}</p>
        </div>
      </div>

      {/* Widget TradingView */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Grafik Harga</h2>
        <div className="tradingview-widget-container">
          <div id="tradingview_chart" style={{ height: "500px" }}></div>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              new TradingView.widget({
                "width": "100%",
                "height": 500,
                "symbol": "OANDA:XAUUSD",
                "interval": "60",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_chart"
              });
            `,
            }}
          />
        </div>
      </div>
    </div>
  );
}
