# 🛡️ מקלט קרוב

**מצא את המקלט הקרוב אליך בשניות — כי בזמן חירום כל שנייה חשובה.**

אפליקציית ווב חינמית (PWA) לאיתור המקלט הציבורי הקרוב למיקומך מתוך **42,123 מקלטים** ממופים בכל ישראל. ניווט מיידי ב-Waze, Google Maps ו-Apple Maps. עובדת ללא הרשמה ומחוץ לרשת.

🌐 **[miklat.co.il](https://miklat.co.il)**

---

## תכונות

| תכונה | תיאור |
|--------|--------|
| 📍 **איתור מיקום** | מאתר את המיקום שלך ומציג את 5 המקלטים הקרובים ביותר |
| 🗺️ **מפה אינטראקטיבית** | 42,123 נקודות מקלטים בכל הארץ, כולל מיקום המשתמש |
| 🧭 **ניווט ליד המפה** | בלוק ניווט מיידי מתחת למפה, ללא גלילה |
| 🚗 **ניווט לאפליקציות** | Waze, Google Maps, Apple Maps — כפתור אחד |
| 🚶 **זמן הליכה** | הערכת זמן הליכה לכל מקלט |
| 📤 **שיתוף** | שיתוף מיקום + מקלט קרוב ביותר בלחיצה אחת |
| 🔗 **קישורים עמוקים** | פתיחה עם `?lat=&lng=&lang=` — מוכן מראש |
| 📱 **PWA** | התקנה למסך הבית, עובד offline |
| 🌍 **רב-לשוני** | עברית (RTL), English, Русский |
| ♿ **נגיש** | תקן ת"י 5568 / WCAG 2.1 AA |
| 🔒 **פרטיות** | אין שמירת מיקום בשרת, אין עוגיות מעקב |

---

## מבנה הפרויקט

```
miklat-karov/
├── index.html        # דף יחיד: ממשק, מפה, לוגיקה, JSON-LD schema
├── i18n.js           # מחרוזות UI בעברית / אנגלית / רוסית
├── shelters.json     # 42,123 נקודות מקלטים [lat, lng]
├── sw.js             # Service Worker — offline + cache
├── manifest.json     # PWA manifest
├── llms.txt          # תיאור האתר לסורקי AI / LLM
├── logo.png          # לוגו האתר
├── og-image.png      # תמונת Open Graph
├── brand/
│   ├── waze.svg
│   ├── google-maps.svg
│   └── apple-maps.svg
└── .cursor/rules/
    └── seo-aeo.mdc   # כלל Cursor לתקני SEO/AEO 2026
```

---

## מקור הנתונים

נתוני מיקום המקלטים מבוססים על שלושה מקורות ציבוריים ופתוחים:

- [GovMap](https://www.govmap.gov.il) — פורטל המפות הממשלתי של ישראל (רישיון **CC-BY**)
- [מערכת GIS של עיריית תל אביב-יפו](https://gisn.tel-aviv.gov.il) — נתוני מקלטים עירוניים עם פרטים (כתובת, סוג מקלט, הערות)
- [OpenStreetMap](https://www.openstreetmap.org/) — קהילת המיפוי הפתוח (רישיון **ODbL**)

---

## טכנולוגיות

| ספרייה | שימוש |
|--------|--------|
| Vanilla JS / HTML / CSS | ללא frameworks |
| [Leaflet 1.9.4](https://leafletjs.com/) | מפות אינטראקטיביות |
| [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) | קיבוץ סמנים |
| [CARTO Voyager](https://carto.com/) | שכבת מפה |
| [OpenStreetMap](https://www.openstreetmap.org/) | נתוני מפה (ODbL) |
| [GoatCounter](https://www.goatcounter.com/) | סטטיסטיקת כניסות ללא עוגיות |
| Service Worker | אופליין + מטמון |

---

## הפעלה מקומית

האתר הוא אפליקציית ווב סטטית — אין צורך ב-build.

```bash
git clone https://github.com/xe255/miklat-karov.git
cd miklat-karov
npx serve .
# או
python -m http.server 8000
```

> **שימו לב:** שירותי מיקום (Geolocation) דורשים HTTPS או localhost.

---

## קישורים עמוקים (URL params)

ניתן לפתוח את האתר עם מיקום ושפה מוגדרים מראש:

| פרמטר | תיאור | דוגמה |
|--------|--------|--------|
| `lat` | קו רוחב WGS84 | `32.0853` |
| `lng` | קו אורך | `34.7818` |
| `lang` | שפה | `he` / `en` / `ru` |

```
https://miklat.co.il/?lang=en&lat=32.0853&lng=34.7818
```

- הפרמטרים `testlat` / `testlng` נתמכים כשמות חלופיים לאותו שימוש.
- אחרי הטעינה אפשר ללחוץ **"חפש שוב"** לאיתור מחדש לפי GPS אמיתי.
- כפתור **שתף מיקום ומקלט קרוב** מייצר טקסט עם קואורדינטות וקישור לפתיחה מחדש.

---

## SEO & AEO

האתר מותאם לחיפוש בגוגל ולמנועי AI:

- **JSON-LD schema** — `WebApplication`, `FAQPage`, `BreadcrumbList`
- **hreflang** — `he`, `en`, `ru`, `x-default`
- **`llms.txt`** — תיאור מובנה לסורקי LLM
- **כלל Cursor** — `.cursor/rules/seo-aeo.mdc` לשמירה על תקנים בעריכה עתידית

---

## פרטיות

- האתר **לא שומר** את מיקום ה-GPS בשרת — החישוב מקומי בדפדפן בלבד
- **סטטיסטיקת כניסות** ללא זיהוי אישי דרך [GoatCounter](https://www.goatcounter.com/) — ללא מיקום, ללא תוצאות חיפוש
- האתר **אינו מציב** עוגיות מעקב/פרסום; לשירות הסטטיסטיקה יש [מדיניות פרטיות משלו](https://www.goatcounter.com/help/privacy)

---

## לוגואים (`brand/`)

- **Google Maps** — וקטור מ-[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Google_Maps_icon_(2020).svg) (סימן מסחרי של Google)
- **Waze** — [Simple Icons](https://simpleicons.org/) (CC0)
- **Apple Maps** — אייקון מקורי; אינו נכס רשמי של Apple

---

## הצהרה משפטית

אתר זה הוא **פרויקט עצמאי** ואינו מופעל, ממומן, או מאושר על ידי פיקוד העורף, צה"ל, משרד הביטחון, או כל גורם ממשלתי אחר. המידע מוצע כמות שהוא (AS IS) ואינו מהווה תחליף להנחיות פיקוד העורף.

---

## רישיון

| רכיב | רישיון |
|-------|--------|
| קוד האתר | MIT |
| נתוני מקלטים | CC-BY (GovMap) + עיריית תל אביב-יפו GIS |
| נתוני מפה | © OpenStreetMap contributors (ODbL) |
