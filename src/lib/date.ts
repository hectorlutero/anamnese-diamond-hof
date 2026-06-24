export function formatBrazilDate(date: Date = new Date()): string {
  return date.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

export function formatLocalData(cidade: string, uf: string, date: Date = new Date()): string {
  const local = [cidade, uf].filter(Boolean).join(" - ");
  const data = formatBrazilDate(date);
  return local ? `${local}, ${data}` : data;
}

export async function inferCityFromGeolocation(): Promise<string | null> {
  if (typeof window === "undefined" || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=pt-BR`,
            { headers: { "User-Agent": "DiamondHOF-Anamnese/1.0" } }
          );
          if (!res.ok) {
            resolve(null);
            return;
          }
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.municipality ||
            data.address?.village ||
            null;
          resolve(city);
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
      { timeout: 8000, maximumAge: 300000 }
    );
  });
}
